"use client";

import { BtnSmall } from "@/components/ui/button";
import InputBox from "@/components/ui/inputBox";
import { useEffect, useState } from "react";
import Image from "next/image";
import CommentList from "@/components/ui/commentList";

export default function ForumDetail({}) {
  return (
    <div className="mt-25.5">
      <div className="flex flex-col items-start gap-6 w-85.75 md:w-174 xl:w-300">
        <div className="flex justify-between w-full place-content-between">
          <h3 className="flex items-center gap-2 self-stretch grow shrink-0 basis-0 text-xl leading-8 font-semibold">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </h3>
          <button className="">
            <p className="font-bold text-2xl text-gray-400">︙</p>
          </button>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex gap-4 items-center ">
            <Image
              className="bg-gray-300 rounded-full"
              src="/panda_ic.png"
              alt="아이콘"
              width={40}
              height={40}
            />
            <p> 총명한판다 </p>
            <p> 0000.00.00 </p>
          </div>
          <div>
            <p className=" text-gray-200 font-bold">|</p>
          </div>
          <div>
            <p>♡ 0000+ </p>
          </div>
        </div>
        <div>
          <p>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</p>
        </div>
      </div>
      <div>
        <div className="mt-8">
          <p className="font-semibold ">댓글달기</p>
          <InputBox className="h-26 flex-col " value={"댓글을 입력해주세요"} />
        </div>
        <BtnSmall className="bg-gray-400">등록</BtnSmall>
      </div>
      <div>
        <CommentList />
        <CommentList />
        <CommentList />
      </div>
    </div>
  );
}
