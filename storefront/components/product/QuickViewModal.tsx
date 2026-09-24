'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, ShoppingBag, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '../../lib/types';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  const currentColor = product.colors?.[selectedColorIndex];
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];
  const activeImage = images[selectedImageIndex] || product.image_url;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(
      product,
      selectedSize,
      currentColor?.name,
      currentColor?.hex,
      quantity
    );
    toast.success(`Added ${quantity}x ${product.name} (${selectedSize}) to your bag`);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 400);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-neutral-200 rounded-none bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          {/* Left: Gallery */}
          <div className="md:w-1/2 bg-neutral-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="relative aspect-square w-full bg-white border border-neutral-200 overflow-hidden">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-18 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-neutral-950 ring-1 ring-black'
                        : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Buy Actions */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                {product.category && (
                  <Badge variant="secondary" className="text-[9px]">
                    {product.category.name}
                  </Badge>
                )}
                {product.reviews_avg && (
                  <div className="flex items-center gap-1 text-neutral-700">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-xs">{product.reviews_avg}</span>
                    <span className="text-neutral-400 text-[11px]">({product.reviews_count})</span>
                  </div>
                )}
              </div>

              {/* Name & Pricing */}
              <div>
                <h3 className="text-xl font-display font-bold text-neutral-900 tracking-tight">
                  {product.name}
                </h3>
                <div className="mt-1.5 flex items-center space-x-2.5">
                  <span className="text-xl font-bold text-neutral-950 font-sans">
                    {product.price_formatted}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-xs text-neutral-400 line-through font-sans">
                      {product.original_price_formatted}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 font-medium mb-2 font-display">
                    Color: <strong className="text-neutral-900">{currentColor?.name}</strong>
                  </span>
                  <div className="flex items-center space-x-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          selectedColorIndex === idx
                            ? 'ring-2 ring-neutral-950 ring-offset-2 scale-105 border-neutral-900'
                            : 'border-neutral-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColorIndex === idx && (
                          <Check
                            size={12}
                            className={
                              color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#eae6df'
                                ? 'text-black'
                                : 'text-white'
                            }
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium font-display">
                    Size: <strong className="text-neutral-900">{selectedSize}</strong>
                  </span>
                  <span className="text-[11px] text-neutral-400">Regular Fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(product.sizes || ['Standard']).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[42px] h-10 px-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                        selectedSize === size
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                          : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA with shadcn Button */}
              <div className="pt-2 flex items-center space-x-3">
                <div className="flex items-center border border-neutral-300 h-11 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-neutral-600 hover:text-black text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-neutral-900 font-sans">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-neutral-600 hover:text-black text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 h-11 shadow-md"
                >
                  <ShoppingBag size={14} />
                  <span>{isAdding ? 'Adding to Bag...' : 'Add to Bag'}</span>
                </Button>
              </div>

              {/* Link to Full PDP */}
              <div className="pt-1 text-center">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center space-x-1.5 text-xs text-neutral-600 hover:text-neutral-950 underline underline-offset-4"
                >
                  <span>View Product Details</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-6 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-3 text-[11px] text-neutral-500">
              <div className="flex items-center space-x-1.5">
                <Truck size={14} className="text-neutral-700 shrink-0" />
                <span>Free Shipping over ₹1,999</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck size={14} className="text-neutral-700 shrink-0" />
                <span>7-Day Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
