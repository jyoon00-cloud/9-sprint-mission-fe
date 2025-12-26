import ProductDetail from "@/components/ui/productDetail";
import { getProductsById, getComments } from "@/lib/api/products";
import { notFound } from "next/navigation";

export default async function ItemsDetail(props) {
  const params = await props.params;
  const { itemId } = params;
  let productData;
  let commentsData;

  try {
    productData = await getProductsById(itemId);
    commentsData = await getComments(itemId);
  } catch (error) {
    console.error("데이터 불러오기 실패:", error);
    return notFound();
  }

  return (
    <ProductDetail
      initialProduct={productData}
      initialComments={commentsData.data || []}
    />
  );
}
