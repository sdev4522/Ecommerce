'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CurrencyConfig } from '../../lib/types';
import { DEFAULT_CURRENCY_CONFIG, formatPrice as baseFormatPrice, setActiveCurrencyConfig } from '../../lib/utils';

interface CurrencyContextValue {
  currency: CurrencyConfig;
  formatPrice: (price: number | string | undefined | null, customConfig?: Partial<CurrencyConfig>) => string;
  setCurrency: (config: CurrencyConfig) => void;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: DEFAULT_CURRENCY_CONFIG,
  formatPrice: (price, customConfig) => baseFormatPrice(price, customConfig),
  setCurrency: () => {},
});

export function CurrencyProvider({
  children,
  initialConfig,
}: {
  children: React.ReactNode;
  initialConfig?: CurrencyConfig;
}) {
  const [currency, setCurrencyState] = useState<CurrencyConfig>(initialConfig || DEFAULT_CURRENCY_CONFIG);

  // Synchronize global utils activeCurrencyConfig
  if (initialConfig && initialConfig.symbol && (initialConfig.code !== currency.code || initialConfig.symbol !== currency.symbol)) {
    setActiveCurrencyConfig(initialConfig);
  }

  useEffect(() => {
    if (initialConfig && initialConfig.symbol) {
      setCurrencyState(initialConfig);
      setActiveCurrencyConfig(initialConfig);
    }
  }, [initialConfig]);

  const value = useMemo<CurrencyContextValue>(() => {
    return {
      currency,
      formatPrice: (price, customConfig) => {
        return baseFormatPrice(price, {
          ...currency,
          ...customConfig,
        });
      },
      setCurrency: (newConfig) => {
        setCurrencyState(newConfig);
        setActiveCurrencyConfig(newConfig);
      },
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: DEFAULT_CURRENCY_CONFIG,
      formatPrice: (price, customConfig) => baseFormatPrice(price, customConfig),
      setCurrency: () => {},
    };
  }
  return context;
}
