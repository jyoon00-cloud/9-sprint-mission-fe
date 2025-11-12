import api from "../api";

// POST
// "/products"
export async function postProducts(data = {}) {
  const res = await api.post("/products", data);
  return res.data;
}

//GET
///products
export async function getProducts(params = {}) {
  const res = await api.get("/products", { params });
  return res.data;
}

//GET
///products/{productId}
export async function getProductsById(productId) {
  const res = await api.get(`/products/${productId}`);
  return res.data;
}

//PATCH
///products/{productId}
export async function patchProduct(productId, data = {}) {
  const res = await api.patch(`/products/${productId}`, data);
  return res.data;
}

//DELETE
///products/{productId}
export async function deleteProduct(productId) {
  const res = await api.delete(`/products/${productId}`);
  return res.data;
}
//POST
///products/{productId}/comments
export async function postComments(productId, data = {}) {
  const res = await api.post(`/products/${productId}/comments`, data);
  return res.data;
}
//GET
///products/{productId}/comments
export async function getComments(productId) {
  const res = await api.get(`/products/${productId}/comments`);
  return res.data;
}
