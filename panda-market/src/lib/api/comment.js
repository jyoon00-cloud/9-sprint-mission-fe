import api from "../api";

export async function patchComment(commentId, data = {}) {
  const res = await api.patch(`/comments/${commentId}`, data);
  return res.data;
}

export async function deleteComment(commentId) {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
}
