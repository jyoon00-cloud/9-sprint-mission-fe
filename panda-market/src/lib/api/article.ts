import api from "../api";
import type { Article, Comment } from "@/types";

type CreateArticleInput = Omit<
  Article,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "favoriteCount"
  | "isFavorite"
  | "uploader"
  | "uploaderId"
  | "images"
> & { images?: string[] };
type UpdateArticleInput = Partial<CreateArticleInput>;

// POST
// "/articles"
export async function postArticles(data: CreateArticleInput): Promise<Article> {
  const res = await api.post<Article>("/articles", data);
  return res.data;
}

//GET
//"/articles"
export async function getArticles(
  params: object = {}
): Promise<{ data: Article[] }> {
  const res = await api.get<{ data: Article[] }>("/articles", { params }); //
  return res.data;
}

//GET
//"/articles/{articleId}"
export async function getArticleById(id: number): Promise<Article> {
  const res = await api.get<Article>(`/articles/${id}`);
  return res.data;
}

//PATCH
//"/articles/{articleId}"
export async function patchArticle(
  id: number,
  data: UpdateArticleInput
): Promise<Article> {
  const res = await api.patch<Article>(`/articles/${id}`, data);
  return res.data;
}

//DELETE
//"/articles/{articleId}"
export async function deleteArticle(id: number): Promise<void> {
  await api.delete(`/articles/${id}`);
}
//POST
//"/articles/{articleId}/comments"
export async function postComments(
  id: number,
  data: { content: string }
): Promise<Comment> {
  const res = await api.post<Comment>(`/articles/${id}/comments`, data);
  return res.data;
}
//GET
//"/articles/{articleId}/comments"
export async function getComments(id: number): Promise<Comment[]> {
  const res = await api.get<Comment[]>(`/articles/${id}/comments`);
  return res.data;
}
