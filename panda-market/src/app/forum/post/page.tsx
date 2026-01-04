"use client";
import { BtnSmall } from "@/components/ui/button";
import { InputBox } from "@/components/ui/inputBox";
import React, { useState } from "react";
import { postArticles } from "@/lib/api/article";
import { useRouter } from "next/navigation";

export default function WriteForum() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isDisabled = title.trim() === "" || content.trim() === "";

  const handleSubmit = async () => {
    if (isDisabled) return;
    try {
      const newArticle = { title, content };
      await postArticles(newArticle);
      router.push("/forum");
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  return (
    <div className="w-full max-w-400 mx-auto p-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold leading-8">게시글 쓰기</h2>
        <BtnSmall
          onClick={handleSubmit}
          disabled={isDisabled}
          className={isDisabled ? "bg-gray-400 text-gray-100" : ""}
        >
          등록
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        ></InputBox>
      </div>
    </div>
  );
}
