"use client";

import Image from "next/image";
import { BtnSmall } from "@/components/ui/button";
import { useState } from "react";
import InputBox from "./inputBox";

export default function CommentList({ comments = [], onUpdate, onDelete }) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setUpdatedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setUpdatedContent("");
  };

  const handleSaveEdit = (commentId) => {
    onUpdate(commentId, updatedContent);
    handleCancelEdit();
  };

  return (
    <div>
      {comments.length === 0 ? (
        <div>
          <Image
            className="mx-auto mt-10"
            src="/img_reply_empty.png"
            alt="댓글 없음 아이콘"
            width={140}
            height={140}
          />
          <p className="text-center text-gray-500 mt-4">
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mt-4 border-b pb-4">
            {editingCommentId === comment.id ? ( // 수정시
              <div>
                <InputBox
                  className="h-20"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <BtnSmall onClick={() => handleSaveEdit(comment.id)}>
                    수정 완료
                  </BtnSmall>
                  <BtnSmall onClick={handleCancelEdit}>취소</BtnSmall>
                </div>
              </div>
            ) : (
              // 기본
              <div>
                <div className="flex justify-between">
                  <p>{comment.content}</p>
                  <CommentDropdown
                    onEdit={() => handleEditClick(comment)}
                    onDelete={() => onDelete(comment.id)}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    className="bg-gray-300 rounded-full"
                    src="/panda_ic.png"
                    alt="아이콘"
                    width={32}
                    height={32}
                  />
                  <div>
                    <p>닉네임</p>
                    <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

function CommentDropdown({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <p className="font-bold text-2xl text-gray-400">︙</p>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-10">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            수정하기
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
