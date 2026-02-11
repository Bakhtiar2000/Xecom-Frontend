import { StaticImageData } from 'next/image';

export interface ShoePart {
  title: string;
  img: string | StaticImageData;
  top?: string;
  bottom?: string;
  left?: string;
}

export interface Shoe {
  id: number;
  image: any;
  name: string;
  price: string;
  trademark: string;
  description: string;
  parts: ShoePart[];
}


export interface SneakerGalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  brand: string;
  colorway: string;
  featured: boolean;
  className?: string; 
  likes: number;
  description: string;
}
