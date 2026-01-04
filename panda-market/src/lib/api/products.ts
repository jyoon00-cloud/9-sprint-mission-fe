import api from "../api";
import type { Product, Comment as CommentType } from "@/types";

type CreateProductInput = Omit<
  Product,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "favoriteCount"
  | "isFavorite"
  | "uploader"
  | "uploaderId"
  | "images"
> & {
  images?: string[];
};

// POST
// "/products"
export async function postProducts(data: CreateProductInput): Promise<Product> {
  const res = await api.post<Product>("/products", data);
  return res.data;
}

//GET
///products
export async function getProducts(
  params: object = {}
): Promise<{ data: Product[] }> {
  const res = await api.get<{ data: Product[] }>("/products", { params }); //
  return res.data;
}

//GET
///products/{productId}
export async function getProductsById(productId: number): Promise<Product> {
  const res = await api.get<Product>(`/products/${productId}`);
  return res.data;
}

//PATCH
///products/{productId}
export async function patchProduct(
  productId: number,
  data: Partial<CreateProductInput>
): Promise<Product> {
  const res = await api.patch<Product>(`/products/${productId}`, data);
  return res.data;
}

//DELETE
///products/{productId}
export async function deleteProduct(productId: number): Promise<void> {
  await api.delete(`/products/${productId}`);
}
//POST
///products/{productId}/comments
export async function postComments(
  productId: number,
  data: { content: string }
): Promise<CommentType> {
  const res = await api.post<CommentType>(
    `/products/${productId}/comments`,
    data
  );
  return res.data;
}
//GET
///products/{productId}/comments
export async function getComments(productId: number): Promise<CommentType[]> {
  const res = await api.get<CommentType[]>(`/products/${productId}/comments`);
  return res.data;
}

export async function postFavorite(productId: number): Promise<Product> {
  const res = await api.post<Product>(`/products/${productId}/favorite`);
  return res.data;
}

export async function deleteFavorite(productId: number): Promise<Product> {
  const res = await api.delete<Product>(`/products/${productId}/favorite`);
  return res.data;
}
