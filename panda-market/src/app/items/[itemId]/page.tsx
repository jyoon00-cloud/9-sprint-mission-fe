import ProductDetail from "@/components/ui/productDetail";
import { getProductsById, getComments } from "@/lib/api/products";
import { notFound } from "next/navigation";
import type { Comment as CommentType, Product } from "@/types";

type ItemProps = {
  params: { itemId: string };
};

export default async function ItemsDetail({ params }: ItemProps) {
  const { itemId } = params;
  const itemIdNum = Number(itemId);
  if (isNaN(itemIdNum)) {
    return notFound();
  }
  let productData;
  let commentsData;

  try {
    productData = await getProductsById(itemIdNum);
    commentsData = await getComments(itemIdNum);
  } catch (error) {
    console.error("데이터 불러오기 실패:", error);
    return notFound();
  }

  return (
    <ProductDetail
      initialProduct={productData}
      initialComments={commentsData || []}
    />
  );
}
