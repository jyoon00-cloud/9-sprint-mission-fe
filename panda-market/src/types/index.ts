export interface User {
  id: number;
  email: string;
  nickname: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  uploaderId: number;
  uploader: User;
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
  id: number;
  uploaderId: number;
  uploader: User;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface Comment {
  id: number;
  authorId: number;
  author: User;
  articleId?: number | null;
  productId?: number | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: number;
  userId: number;
  productId?: number | null;
  articleId?: number | null;
  createdAt: string;
}

export type SignUpInput = Pick<User, "email" | "nickname"> & {
  password: string;
};
export type SignInInput = Pick<User, "email"> & { password: string };

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
