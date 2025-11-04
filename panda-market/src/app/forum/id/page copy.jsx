"use client";

import { BtnSmall } from "@/components/ui/button";
import InputBox from "@/components/ui/inputBox";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ForumDetail({ params }) {
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const API_URL = `https://localhost:3000/articles/${id}`;
    async function fetchArticle() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "게시글을 찾을 수 없습니다");
        }
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);
  if (loading) {
    return <p>로딩중</p>;
  }
  if (error) {
    return <p>에러 :{error}</p>;
  }
  return (
    <div className="flex flex-col items-start gap-6 w-85.75 md:w-174 xl:w-300">
      <div className="flex items-center gap-2 self-stretch">
        <div className="grow shrink-0 basis-0 text-xl leading-8 font-semibold">
          {article.title}
        </div>
      </div>
      <div>
        <Image src="/panda_ic.png" alt="아이콘" width={24} height={24} />
        <p> 닉네임 </p>
        <p> 0000.00.00 </p>
        <p>♡ 0000+ </p>
      </div>
    </div>
  );
}
