import React from 'react';

export interface CircularGalleryItem {
  image: string;
  text: string;
}

export interface CircularGalleryRef {
  next: () => void;
  prev: () => void;
}

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  className?: string;
}

declare const CircularGallery: React.ForwardRefExoticComponent<
  CircularGalleryProps & React.RefAttributes<CircularGalleryRef>
>;

export default CircularGallery;
