"use client";
import { useState, useEffect } from "react";
import { CardList } from "./forumCard";
import Dropdown from "./dropdown";
import { SmallInput } from "@/components/ui/inputBox";
import { getArticles } from "@/lib/api/article";
import type { Article } from "@/types";

interface ForumListProps {
  initialArticles?: Article[];
}

export default function ForumList({ initialArticles = [] }: ForumListProps) {
  const [searchResults, setSearchResults] = useState<Article[] | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"recent" | "likes">("recent");

  useEffect(() => {
    const fetchArticles = async () => {
      const isSearching = Boolean(searchWord);
      const isDefaultSort = sortOrder === "recent";
      if (!isSearching && isDefaultSort) {
        setSearchResults(null);
        return;
      }

      try {
        const params = {
          word: searchWord,
          orderBy: sortOrder,
        };
        const data = await getArticles(params);
        setSearchResults(data.data || []);
      } catch (error) {
        console.error("게시글 불러오기 실패", error);
        setSearchResults([]);
      }
    };
    fetchArticles();
  }, [searchWord, sortOrder]);
  const displayArticles =
    searchResults !== null ? searchResults : initialArticles;

  return (
    <>
      <div className="max-w-300 flex w-full h-11 justify-center items-center gap-8 mb-4">
        <SmallInput
          className="flex-1 h-10 rounded-2xl p-6"
          placeholder="검색할 상품을 입력해주세요"
          value={searchWord}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.target.value)
          }
        />
        <Dropdown
          value={sortOrder}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortOrder(e.target.value as "recent" | "likes")
          }
        />
      </div>
      <div>
        <CardList articles={displayArticles} />
      </div>
    </>
  );
}
