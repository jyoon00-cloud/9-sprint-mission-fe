"use client";
import { BtnSmall } from "@/components/ui/button";
import { InputBox } from "@/components/ui/inputBox";
import { useState, useEffect } from "react";
import { patchProduct, getProductsById } from "@/lib/api/products";
import { useRouter, useParams } from "next/navigation";

export default function EditProducts() {
  const router = useRouter();
  const params = useParams();
  const { itemId } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isDisabled = title.trim() === "" || content.trim() === "" || isLoading;

  useEffect(() => {
    if (!itemId) return;
    const fetchProduct = async () => {
      try {
        const productData = await getProductsById(itemId);
        setTitle(productData.title);
        setContent(productData.content);
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
        alert("게시글 로딩 실패");
        router.push("/items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [itemId, router]);

  const handleSubmit = async () => {
    if (isDisabled) return;
    setIsLoading(true);

    try {
      const updatedProduct = { title, content };
      await patchProduct(itemId, updatedProduct);
      router.push(`/items/${itemId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-400 mx-auto p-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold leading-8">게시글 수정하기</h2>
        <BtnSmall
          onClick={handleSubmit}
          disabled={isDisabled}
          className={isDisabled ? "bg-gray-400 text-gray-100" : ""}
        >
          {isLoading ? "수정중..." : "수정"}
        </BtnSmall>
      </div>
      <div>
        <p>*제목</p>
        <InputBox
          placeholder="제목을 입력해주세요"
          className="h-14"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></InputBox>
      </div>
      <div>
        <p>*내용</p>
        <InputBox
          placeholder="내용을 입력해주세요"
          className="h-71"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></InputBox>
      </div>
    </div>
  );
}
