export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
  isPopular?: boolean;
  isChefChoice?: boolean;
}

export type MenuCategory =
  | "entradas"
  | "marisqueira"
  | "pratos"
  | "sobremesas"
  | "bebidas";

export interface Review {
  id: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  date: string;
  photos?: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "comida" | "ambiente" | "eventos";
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  serviceType: "local" | "takeaway";
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}
