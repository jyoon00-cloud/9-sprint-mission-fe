import api from "../api";

// POST
// "/articles"
export async function postArticles(data = {}) {
  const res = await api.post("/articles", data);
  return res.data;
}

//GET
//"/articles"
export async function getArticles(params = {}) {
  const res = await api.get("/articles", { params });
  return res.data;
}

//GET
//"/articles/{articleId}"
export async function getArticleById(id) {
  const res = await api.get(`/articles/${id}`);
  return res.data;
}

//PATCH
//"/articles/{articleId}"
export async function patchArticle(id, data = {}) {
  const res = await api.patch(`/articles/${id}`, data);
  return res.data;
}

//DELETE
//"/articles/{articleId}"
export async function deleteArticle(id) {
  const res = await api.delete(`/articles/${id}`);
  return res.data;
}
//POST
//"/articles/{articleId}/comments"
export async function postComments(id, data = {}) {
  const res = await api.post(`/articles/${id}/comments`, data);
  return res.data;
}
//GET
//"/articles/{articleId}/comments"
export async function getComments(id) {
  const res = await api.get(`/articles/${id}/comments`);
  return res.data;
}
