import { NavItem, MenuItem, Review, StatItem, GalleryImage } from "./types";

export const SITE = {
  name: "Terraza Talatona",
  tagline: "Marisqueira · Fine Dining · Luanda",
  description:
    "Restaurante Marisqueira de fusão em Luanda, Angola. Cozinha portuguesa, angolana e internacional com ingredientes frescos e ambiente sofisticado.",
  phone: "+245922257705",
  phoneFormatted: "922 257 705",
  email: "reservas@terraza-talatona.co.ao",
  address: "Condomínio Zenith Towers, Luanda, Talatona",
  what3words: "36H2+GR Talatona",
  hours: "Seg - Dom: 11:30 - 23:30",
  whatsapp: "https://wa.me/245922257705",
  mapsUrl:
    "https://www.google.com/maps/place/Terraza+Talatona/@-8.9025,13.2056,17z",
  googleReviewUrl:
    "https://www.google.com/maps/place/Terraza+Talatona",
  instagram: "https://www.instagram.com/terrazatalatona",
  facebook: "https://www.facebook.com/terrazatalatona",
  coordinates: {
    lat: -8.9025,
    lng: 13.2056,
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Menu", href: "#menu" },
  { label: "Sobre", href: "#sobre" },
  { label: "Galeria", href: "#galeria" },
  { label: "Críticas", href: "#criticas" },
  { label: "Contactos", href: "#contactos" },
];

export const STATS: StatItem[] = [
  { value: 8, suffix: "+", label: "Anos de Experiência" },
  { value: 222, suffix: "+", label: "Críticas Positivas" },
  { value: 50, suffix: "+", label: "Pratos Únicos" },
  { value: 4.3, suffix: "", label: "Avaliação Google" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Ceviche de Camarão",
    description:
      "Camarão fresco marinado em limão, coentro, cebola roxa e pimenta malagueta",
    price: 4500,
    category: "entradas",
    isPopular: true,
  },
  {
    id: "2",
    name: "Polvo à Lagareiro",
    description:
      "Polvo assado no forno com azeite, alho e batatas a murro",
    price: 7500,
    category: "marisqueira",
    isChefChoice: true,
  },
  {
    id: "3",
    name: "Vitela Maturidade",
    description:
      "Vitela maturada grelhada com esparguete fresco e cogumelos selectos",
    price: 8500,
    category: "pratos",
    isPopular: true,
  },
  {
    id: "4",
    name: "Picanha Angus",
    description:
      "Picanha Angus premium grelhada com arroz de tomate, feijão preto e batatas fritas",
    price: 9000,
    category: "pratos",
    isChefChoice: true,
  },
  {
    id: "5",
    name: "Filet Mignon com Risoto",
    description:
      "Filet Mignon suave com risoto de cogumelos frescos e trufas negras",
    price: 11000,
    category: "pratos",
    isPopular: true,
  },
  {
    id: "6",
    name: "Lagosta Grelhada",
    description:
      "Lagosta inteira grelhada com manteiga de ervas, alho e limão siciliano",
    price: 18000,
    category: "marisqueira",
    isChefChoice: true,
  },
  {
    id: "7",
    name: "Arroz de Marisco",
    description:
      "Arroz cremoso com amêijoas, camarão, caranguejo e perfumes do mar",
    price: 7000,
    category: "marisqueira",
  },
  {
    id: "8",
    name: "Bacalhau à Brás",
    description:
      "Bacalhau desfiado com batatas palha, ovos mexidos e azeitonas",
    price: 6500,
    category: "pratos",
  },
  {
    id: "9",
    name: "Tiramisu da Casa",
    description:
      "Tiramisu artesanal com café espresso, mascarpone e cacau amargo",
    price: 3500,
    category: "sobremesas",
    isPopular: true,
  },
  {
    id: "10",
    name: "Churros com Chocolate",
    description:
      "Churros crocantes enrolados em açúcar e canela com molho de chocolate belga",
    price: 2500,
    category: "sobremesas",
  },
  {
    id: "11",
    name: "Pudim de Leite",
    description:
      "Pudim caseiro de leite condensado com calda de caramelo",
    price: 2800,
    category: "sobremesas",
  },
  {
    id: "12",
    name: "Salmão Grelhado",
    description:
      "Salmão fresco grelhado com legumes assados e molho de maracujá",
    price: 7500,
    category: "pratos",
  },
  {
    id: "13",
    name: "Camarão ao Alho",
    description:
      "Camarões grandes salteados em manteiga de alho, ervas frescas e vinho branco",
    price: 6500,
    category: "marisqueira",
    isPopular: true,
  },
  {
    id: "14",
    name: "Caipirinha Clássica",
    description:
      "Cachaça premium, limão tahiti fresco, açúcar e gelo picado",
    price: 3000,
    category: "bebidas",
  },
  {
    id: "15",
    name: "Vinho Tinto Reserva",
    description:
      "Vinho tinto português Reserva, notas de frutos silvestres e especiarias",
    price: 8000,
    category: "bebidas",
  },
  {
    id: "16",
    name: "Champagne Brut",
    description:
      "Champagne francês Brut, notas cítricas e florais com bolhas finas",
    price: 15000,
    category: "bebidas",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Jr T",
    role: "Guia Local · 181 críticas",
    rating: 5,
    text: "First time in this restaurant, the place is clean, looking good. You can eat in or out. I ordered picanha with fries, rice and black beans. Do mind the picture, I was too hungry, the meat has a very good taste. Tiramisu was my dessert, not really typical taste, some of the biscuit were still hard.",
    date: "há 10 meses",
    photos: 3,
  },
  {
    id: "2",
    author: "Vanessa",
    role: "Guia Local · 18 críticas",
    rating: 5,
    text: "Excellent food – had the filet mignon with mushroom risotto – delicious. Asked for medium rare steak and it came out perfectly. Good value for money. Excellent service. They also have menus in English. Thoroughly recommended.",
    date: "há 2 anos",
    photos: 8,
  },
  {
    id: "3",
    author: "Ai Kyen Goh",
    role: "Guia Local · 247 críticas",
    rating: 4,
    text: "Terraza is presenting itself as a fine dining aka place to be in Talatona / Luanda. When it comes to the food, they definitely hit the mark. Well presented, excellent flavors with a good variation on the usual Angolan / Portuguese dishes. Service is decent, but can improve.",
    date: "há 3 anos",
    photos: 11,
  },
  {
    id: "4",
    author: "Pedro Santos",
    role: "Cliente Regular",
    rating: 5,
    text: "O melhor restaurante da zona do Talatona. A comida é sempre excelente, o atendimento é muito profissional e o ambiente é perfeito para jantares especiais. A lagosta grelhada é simplesmente divinal!",
    date: "há 3 meses",
    photos: 5,
  },
  {
    id: "5",
    author: "Maria José",
    role: "Cliente",
    rating: 4,
    text: "Uma experiência gastronómica fantástica. O arroz de marisco é o melhor que já comi em Luanda. Recomendo vivamente este restaurante para quem procura qualidade e sofisticação.",
    date: "há 1 mês",
    photos: 2,
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "g1", src: "/images/gallery/food-1.jpg", alt: "Prato principal", category: "comida" },
  { id: "g2", src: "/images/ambient/interior-1.jpg", alt: "Interior do restaurante", category: "ambiente" },
  { id: "g3", src: "/images/gallery/food-2.jpg", alt: "Marisqueira", category: "comida" },
  { id: "g4", src: "/images/ambient/terrace-1.jpg", alt: "Terraça ao ar livre", category: "ambiente" },
  { id: "g5", src: "/images/gallery/food-3.jpg", alt: "Sobremesa", category: "comida" },
  { id: "g6", src: "/images/ambient/bar-1.jpg", alt: "Bar do restaurante", category: "ambiente" },
  { id: "g7", src: "/images/gallery/food-4.jpg", alt: "Especialidade do chef", category: "comida" },
  { id: "g8", src: "/images/ambient/event-1.jpg", alt: "Evento privado", category: "eventos" },
  { id: "g9", src: "/images/gallery/food-5.jpg", alt: "Degustação", category: "comida" },
  { id: "g10", src: "/images/ambient/event-2.jpg", alt: "Celebração", category: "eventos" },
];

export const MENU_CATEGORIES = [
  { id: "all" as const, label: "Todos" },
  { id: "entradas" as const, label: "Entradas" },
  { id: "marisqueira" as const, label: "Marisqueira" },
  { id: "pratos" as const, label: "Pratos Principais" },
  { id: "sobremesas" as const, label: "Sobremesas" },
  { id: "bebidas" as const, label: "Bebidas" },
];

export const GALLERY_CATEGORIES = [
  { id: "all" as const, label: "Todas" },
  { id: "comida" as const, label: "Comida" },
  { id: "ambiente" as const, label: "Ambiente" },
  { id: "eventos" as const, label: "Eventos" },
];

export const TIME_SLOTS = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

export const formatPrice = (price: number) =>
  `${price.toLocaleString("pt-AO")} Kz`;
