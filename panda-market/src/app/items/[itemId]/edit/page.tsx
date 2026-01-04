"use client";
import { BtnSmall } from "@/components/ui/button";
import { InputBox, SmallInput } from "@/components/ui/inputBox";
import { useState, useEffect } from "react";
import { patchProduct, getProductsById } from "@/lib/api/products";
import { useRouter, useParams } from "next/navigation";

export default function EditProducts() {
  const router = useRouter();
  const params = useParams<{ itemId: string }>();
  const itemId = params.itemId;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isDisabled =
    name.trim() === "" || description.trim() === "" || isLoading;

  useEffect(() => {
    if (!itemId) return;
    const itemIdNum = Number(itemId);
    if (isNaN(itemIdNum)) {
      router.push("/items");
      return;
    }

    const fetchProduct = async () => {
      try {
        const productData = await getProductsById(itemIdNum);
        setName(productData.name);
        setDescription(productData.description);
        setPrice(String(productData.price));
        setTags(productData.tags.join(", "));
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
    const itemIdNum = Number(itemId);
    if (isNaN(itemIdNum)) {
      router.push("/items");
      return;
    }
    setIsLoading(true);

    try {
      const updatedProduct = {
        name,
        description,
        price: Number(price),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };
      await patchProduct(itemIdNum, updatedProduct);
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
        <p>*상품명</p>
        <InputBox
          placeholder="제목을 입력해주세요(필수)"
          className="h-14"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></InputBox>
      </div>
      <div>
        <p>*가격</p>
        <SmallInput
          type="number"
          placeholder="가격을 입력해주세요(필수)"
          className="h-14"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></SmallInput>
      </div>
      <div>
        <p>상품 설명</p>
        <InputBox
          placeholder="상품 설명을 입력해주세요"
          className="h-71"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></InputBox>
      </div>
      <div>
        <p>태그</p>
        <InputBox
          placeholder="태그를 입력해주세요(쉼표로 구분)"
          className="h-14"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        ></InputBox>
      </div>
    </div>
  );
}
