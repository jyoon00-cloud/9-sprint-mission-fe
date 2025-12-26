export interface User {
  id: string;
  email: string;
  nickname: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface Article {
  id: string;
  writerId: string;
  title: string;
  content: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface Comment {
  id: string;
  writerId: string;
  articleId?: string | null;
  productId?: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  userId: string;
  productId?: string | null;
  articleId?: string | null;
  createdAt: string;
}
