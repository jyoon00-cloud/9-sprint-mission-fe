const BASE_URL = "https://panda-market-api.vercel.app/products";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "createdAt",
  keyword = "",
} = {}) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  if (orderBy) params.set("orderBy", orderBy);
  if (keyword) params.set("keyword", keyword);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error("상품을 불러오는데 실패했습니다.");
  }
  return res.json();
}

export async function getBestProducts({ page = 1, pageSize = 4 } = {}) {
  return getProducts({ page, pageSize, orderBy: "favorite" });
}
