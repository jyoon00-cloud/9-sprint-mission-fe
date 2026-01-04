"use client";

import { BtnMedium, BtnSmall } from "@/components/ui/button";
import { InputBox } from "@/components/ui/inputBox";
import Image from "next/image";
import CommentList from "@/components/ui/commentList";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteArticle, postComments } from "@/lib/api/article";
import { deleteComment, patchComment } from "@/lib/api/comment";
import type { Article, Comment } from "@/types";

interface ArticleDetailProps {
  initialArticle: Article;
  initialComments: Comment[];
}
export default function ArticleDetail({
  initialArticle,
  initialComments,
}: ArticleDetailProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const articleId = Number(params.id);

  const [article, setArticle] = useState<Article>(initialArticle);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const [newComment, setNewComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleDeleteArticle = async () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        await deleteArticle(articleId);
        alert("게시글이 삭제되었습니다.");
        router.push("/forum");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제 실패");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePostComment = async () => {
    if (newComment.trim() === "" || isLoading) return;
    setIsLoading(true);
    try {
      const postedComment = await postComments(articleId, {
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, postedComment]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      const updatedComment = await patchComment(commentId, { content });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정 실패");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(commentId);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 실패");
      }
    }
  };

  const isCommentButtonDisabled = newComment.trim() === "" || isLoading;

  if (!article) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="mt-25.5">
      <div className="flex flex-col items-start gap-6 w-85.75 md:w-174 xl:w-300">
        <div className="flex justify-between w-full place-content-between">
          <h3 className="flex items-center gap-2 self-stretch grow shrink-0 basis-0 text-xl leading-8 font-semibold">
            {article.title}
          </h3>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <p className="font-bold text-2xl text-gray-400">︙</p>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push(`/forum/${articleId}/edit`)}
                >
                  수정하기
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={handleDeleteArticle}
                  disabled={isLoading}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
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
            <p> {new Date(article.createdAt).toLocaleDateString()} </p>
          </div>
          <div>
            <p className=" text-gray-200 font-bold">|</p>
          </div>
          <div>
            <p>♡ 0000+ </p>
          </div>
        </div>
        <div>
          <p>{article.content}</p>
        </div>
      </div>
      <div>
        <div className="mt-8">
          <p className="font-semibold ">댓글달기</p>
          <InputBox
            placeholder="댓글을 입력해주세요"
            className="h-26 flex-col "
            value={newComment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewComment(e.target.value)
            }
          />
        </div>
        <div className="flex justify-end mt-2 ">
          <BtnSmall
            onClick={handlePostComment}
            disabled={isCommentButtonDisabled}
            className={isCommentButtonDisabled ? "bg-gray-400" : "bg-blue-400"}
          >
            {isLoading ? "등록 중..." : "등록"}
          </BtnSmall>
        </div>
      </div>
      <div>
        <CommentList
          comments={comments}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      </div>
      <div className="items-center flex justify-center mt-10 mb-10">
        <BtnMedium onClick={() => router.push("/forum")}>
          <div className="flex items-center justify-center gap-2">
            <p>목록으로 돌아가기</p>
            <Image src="/ic_back.png" alt="" width={19} height={16} />
          </div>
        </BtnMedium>
      </div>
    </div>
  );
}
