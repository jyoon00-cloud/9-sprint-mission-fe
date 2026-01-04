"use client";
import { BtnSmall } from "@/components/ui/button";
import { InputBox, SmallInput } from "@/components/ui/inputBox";
import { useState } from "react";
import { postProducts } from "@/lib/api/products";
import { useRouter } from "next/navigation";

export default function WriteItem() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");

  const isDisabled =
    name.trim() === "" || description.trim() === "" || price.trim() === "";

  const handleSubmit = async () => {
    if (isDisabled) return;
    try {
      const newProduct = {
        name: name,
        description: description,
        price: Number(price),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };
      await postProducts(newProduct);
      router.push("/items");
    } catch (error) {
      console.error("상품 등록 실패:", error);
    }
  };

  return (
    <div className="w-full max-w-400 mx-auto p-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold leading-8">상품 등록</h2>
        <BtnSmall
          onClick={handleSubmit}
          disabled={isDisabled}
          className={isDisabled ? "bg-gray-400 text-gray-100" : ""}
        >
          등록
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
