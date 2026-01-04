import api from "../api";
import type { Comment } from "@/types";
export async function patchComment(
  commentId: number,
  data: { content: string }
): Promise<Comment> {
  const res = await api.patch<Comment>(`/comments/${commentId}`, data);
  return res.data;
}

export async function deleteComment(commentId: number): Promise<void> {
  const res = await api.delete(`/comments/${commentId}`);
}
