"use client";

import { BtnMedium, BtnSmall } from "@/components/ui/button";
import { InputBox } from "@/components/ui/inputBox";
import Image from "next/image";
import CommentList from "@/components/ui/commentList";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  deleteProduct,
  postComments,
  postFavorite,
  deleteFavorite,
} from "@/lib/api/products";
import { deleteComment, patchComment } from "@/lib/api/comment";
import { TagBox } from "./tag";
import type { Product, Comment as CommentType } from "@/types";

interface ProductDetailProps {
  initialProduct: Product;
  initialComments: CommentType[];
}
export default function ProductDetail({
  initialProduct,
  initialComments,
}: ProductDetailProps) {
  const router = useRouter();
  const params = useParams<{ itemId: string }>();
  const itemId = Number(params.itemId);

  const [product, setProduct] = useState<Product>(initialProduct);
  const [comments, setComments] = useState<CommentType[]>(
    initialComments as unknown as CommentType[]
  );
  const [newComment, setNewComment] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(product.isFavorite);
  const [favorites, setFavorites] = useState<number>(product.favoriteCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleDeleteProduct = async () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        await deleteProduct(itemId);
        alert("게시글이 삭제되었습니다.");
        router.push("/items");
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
      const postedComment = (await postComments(itemId, {
        content: newComment,
      })) as unknown as CommentType;
      setComments((prevComments: CommentType[]) => [
        ...prevComments,
        postedComment,
      ]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (isFavorite) {
        await deleteFavorite(itemId);
        setFavorites((prev) => prev - 1);
      } else {
        await postFavorite(itemId);
        setFavorites((prev) => prev + 1);
      }
      setIsFavorite(!isFavorite);
      setProduct((prevProduct) => ({
        ...prevProduct,
        favoriteCount: isFavorite
          ? prevProduct.favoriteCount - 1
          : prevProduct.favoriteCount + 1,
      }));
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리 실패");
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

  if (!product) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="mt-25.5">
      <div className="border-b border-gray-200 ">
        <div className="flex flex-col mb-10 items-start gap-6 w-85.75 md:w-174 xl:w-300 ">
          <div className="flex justify-between w-full place-content-between">
            <div className=" w-full flex gap-8">
              <figure className="relative w-85 h-85 xl:w-121.5 xl:h-121.5">
                <Image
                  className="object-cover rounded-lg"
                  src={"/image_42.png"}
                  alt="상품 이미지"
                  fill
                />
              </figure>
              <div className="w-full">
                <div className="mb-2.5   w-full border-gray-200 border-b">
                  <div className="flex">
                    <h3 className="flex items-center gap-2 self-stretch grow shrink-0 basis-0 text-[26px] leading-8 font-semibold">
                      {product.name}
                    </h3>
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <p className="font-bold text-2xl text-gray-400">︙</p>
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => router.push(`/items/${itemId}/edit`)}
                          >
                            수정하기
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={handleDeleteProduct}
                            disabled={isLoading}
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="gap-4 text-[2.5rem] font-semibold">
                    {product.price.toLocaleString("ko-kr")}원
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="mb-6">
                    <p className="font-semibold leading-6.5 mb-4">상품 소개</p>
                    <p className="leading-6.5">{product.description}</p>
                  </div>
                  <div className="">
                    <p className="mb-4 font-semibold leading-6.5">상품 태그</p>
                    <p className="flex flex-wrap mb-15.5 gap-4 whitespace-normal">
                      {product.tags.map((tag) => (
                        <TagBox className="" key={tag}>
                          #{tag}{" "}
                        </TagBox>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex gap-8 items-center justify-between">
                  <div className="flex gap-4 items-center ">
                    <Image
                      className="bg-gray-300 rounded-full"
                      src="/panda_ic.png"
                      alt="아이콘"
                      width={40}
                      height={40}
                    />
                    <div className="text-[14px] font-medium leading-6">
                      <p> 총명한판다 </p>
                      <p className="text-gray-400">
                        {new Date(product.createdAt).toLocaleDateString()}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="border-l border-gray-200">
                    <button
                      className="flex ml-3 gap-2 p-4 items-center justify-center rounded-[35px] h-10 text-gray-500 border-2 border-gray-200"
                      onClick={handleFavorite}
                    >
                      <p className="text-2xl font-light">♡ </p>
                      <p>{product.favoriteCount} </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-8">
          <p className="font-semibold ">문의하기</p>
          <InputBox
            placeholder="댓글을 개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
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
        <BtnMedium onClick={() => router.push("/items")}>
          <div className="flex items-center justify-center gap-2">
            <p>목록으로 돌아가기</p>
            <Image src="/ic_back.png" alt="" width={19} height={16} />
          </div>
        </BtnMedium>
      </div>
    </div>
  );
}
