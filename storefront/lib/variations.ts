import { ProductVariation, Product } from './types';

/**
 * Normalizes an attribute key for consistent case-insensitive comparison.
 * e.g., "Color ", "COLOR", "color" -> "color"
 */
export function normalizeAttributeKey(key: string): string {
  return (key || '')
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, '');
}

/**
 * Normalizes an attribute value for consistent comparison.
 * e.g., " Noir Black ", "noir black" -> "noir black"
 */
export function normalizeAttributeValue(val: string): string {
  return (val || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/**
 * Generates a deterministic composite key for a set of attributes.
 * e.g. { size: 'M', color: 'Noir Black' } -> "color:noir black|size:m"
 */
export function generateAttributeKey(attributes: Record<string, string>): string {
  const normalizedEntries = Object.entries(attributes)
    .filter(([_, val]) => val !== undefined && val !== null && val !== '')
    .map(([k, v]) => [normalizeAttributeKey(k), normalizeAttributeValue(v)])
    .sort(([a], [b]) => a.localeCompare(b));

  return normalizedEntries.map(([k, v]) => `${k}:${v}`).join('|');
}

/**
 * Extracts a normalized key-value map of attributes from a ProductVariation.
 */
export function extractVariationAttributes(variation: ProductVariation): Record<string, string> {
  const result: Record<string, string> = {};

  // 1. From variation.attributes record
  if (variation.attributes && typeof variation.attributes === 'object') {
    for (const [k, v] of Object.entries(variation.attributes)) {
      if (v) {
        result[normalizeAttributeKey(k)] = normalizeAttributeValue(v);
      }
    }
  }

  // 2. From variation.selected_attributes array
  if (Array.isArray(variation.selected_attributes)) {
    for (const attr of variation.selected_attributes) {
      const setKey = normalizeAttributeKey(attr.set_slug || (attr as { set_title?: string }).set_title || 'attribute');
      const val = normalizeAttributeValue(attr.title || attr.slug || '');
      if (setKey && val) {
        result[setKey] = val;
      }
    }
  }

  return result;
}

/**
 * Checks if a single variation matches the selected attribute combination.
 */
export function matchesVariation(
  variation: ProductVariation,
  selectedAttributes: Record<string, string>
): boolean {
  const variationAttrs = extractVariationAttributes(variation);

  for (const [key, selectedVal] of Object.entries(selectedAttributes)) {
    if (!selectedVal) continue;
    const normKey = normalizeAttributeKey(key);
    const normVal = normalizeAttributeValue(selectedVal);

    const variationVal = variationAttrs[normKey];
    if (!variationVal) {
      // Attribute not found on this variation
      return false;
    }

    if (variationVal !== normVal) {
      return false;
    }
  }

  return true;
}

/**
 * Builds an in-memory lookup Map for O(1) constant-time variation resolution.
 */
export function buildVariationMap(variations: ProductVariation[]): Map<string, ProductVariation> {
  const map = new Map<string, ProductVariation>();

  for (const v of variations) {
    const attrs = extractVariationAttributes(v);
    const key = generateAttributeKey(attrs);
    if (key) {
      map.set(key, v);
    }
  }

  return map;
}

/**
 * Finds the exact or best matching variation from an array of variations based on selected attributes.
 * Performs matching purely locally in-memory with ZERO network requests.
 */
export function findMatchingVariation(
  variations: ProductVariation[] | undefined,
  selectedAttributes: Record<string, string>
): ProductVariation | null {
  if (!variations || variations.length === 0) {
    return null;
  }

  // 1. Try exact composite key match via Map
  const targetKey = generateAttributeKey(selectedAttributes);
  const variationMap = buildVariationMap(variations);
  if (variationMap.has(targetKey)) {
    return variationMap.get(targetKey)!;
  }

  // 2. Iterative matching in case of partial or extra attributes
  const matching = variations.filter((v) => matchesVariation(v, selectedAttributes));

  if (matching.length === 1) {
    return matching[0];
  }

  if (matching.length > 1) {
    // If multiple candidates match (e.g. subset), prefer one that is in-stock or marked default
    const inStock = matching.find((m) => !m.is_out_of_stock && m.quantity > 0);
    if (inStock) return inStock;
    const isDefault = matching.find((m) => m.is_default);
    if (isDefault) return isDefault;
    return matching[0];
  }

  return null;
}

/**
 * Resolves initial attribute selections for a product when the page loads.
 * Prefers default variation attributes, or the first available variation, or product defaults.
 */
export function resolveInitialAttributes(product: Product): Record<string, string> {
  const initial: Record<string, string> = {};

  if (product.colors && product.colors.length > 0) {
    initial['color'] = product.colors[0].name;
  }

  if (product.sizes && product.sizes.length > 0) {
    initial['size'] = product.sizes[0];
  }

  // If variations exist, check if there's a default variation to seed exact attributes
  if (product.variations && product.variations.length > 0) {
    const defaultVar = product.variations.find((v) => v.is_default) || product.variations[0];
    const extracted = extractVariationAttributes(defaultVar);
    return { ...initial, ...extracted };
  }

  return initial;
}

/**
 * Evaluates whether an attribute value exists and is in-stock given the currently active other attributes.
 * Useful for rendering out-of-stock indicators or disabling impossible combinations in variation selectors.
 */
export function checkAttributeAvailability(
  variations: ProductVariation[] | undefined,
  currentAttributes: Record<string, string>,
  keyToTest: string,
  valToTest: string
): { exists: boolean; inStock: boolean } {
  if (!variations || variations.length === 0) {
    return { exists: true, inStock: true };
  }

  const normKey = normalizeAttributeKey(keyToTest);
  const normVal = normalizeAttributeValue(valToTest);

  // 1. Check with other currently selected attributes held constant
  const testAttributes = { ...currentAttributes, [keyToTest]: valToTest };
  const exactMatching = variations.filter((v) => matchesVariation(v, testAttributes));

  if (exactMatching.length > 0) {
    const hasInStock = exactMatching.some(
      (v) => !v.is_out_of_stock && (typeof v.quantity !== 'number' || v.quantity > 0)
    );
    return { exists: true, inStock: hasInStock };
  }

  // 2. Check if this attribute exists anywhere across all variations
  const anyMatching = variations.filter((v) => {
    const attrs = extractVariationAttributes(v);
    return attrs[normKey] === normVal;
  });

  if (anyMatching.length > 0) {
    const hasInStock = anyMatching.some(
      (v) => !v.is_out_of_stock && (typeof v.quantity !== 'number' || v.quantity > 0)
    );
    return { exists: true, inStock: hasInStock };
  }

  return { exists: false, inStock: false };
}
