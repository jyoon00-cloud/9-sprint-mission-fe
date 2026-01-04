"use client";
import { useState, useEffect } from "react";
import { ItemCardList } from "./itemCard";
import Dropdown from "./dropdown";
import { SmallInput } from "@/components/ui/inputBox";
import { getProducts } from "@/lib/api/products";
import { BtnSmall } from "./button";
import Link from "next/link";
import Image from "next/image";

import type { Product } from "@/types";

interface ItemListProps {
  initialProducts?: Product[];
}
export default function ItemList({ initialProducts = [] }: ItemListProps) {
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"recent" | "likes">("recent");

  useEffect(() => {
    const fetchProducts = async () => {
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
        const data = await getProducts(params);
        setSearchResults(data.data || []);
      } catch (error) {
        console.error("상품 불러오기 실패", error);
        setSearchResults([]);
      }
    };
    fetchProducts();
  }, [searchWord, sortOrder]);

  const displayProducts =
    searchResults !== null ? searchResults : initialProducts;

  return (
    <>
      <div className="max-w-300 flex w-full h-11 justify-between items-center gap-8 mb-4 mt-8">
        <h2 className="font-bold text-xl justify-start">판매 중인 상품</h2>
        <div className="flex gap-4">
          <div className="relative ">
            <Image
              src="/ic_search.png"
              alt="검색 아이콘"
              width={20}
              height={20}
              className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none"
            />
            <SmallInput
              className="flex-1 h-10 rounded-2xl w-80 pl-10"
              placeholder="검색할 상품을 입력해주세요"
              value={searchWord}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchWord(e.target.value)
              }
            />
          </div>
          <Link href="/items/registration" className=" h-10  ">
            <BtnSmall className="text-white  h-10  w-40 ">
              상품 등록하기
            </BtnSmall>
          </Link>
          <Dropdown
            className=" h-10 "
            value={sortOrder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOrder(e.target.value as "recent" | "likes")
            }
          />
        </div>
      </div>
      <div>
        <ItemCardList products={displayProducts} />
      </div>
    </>
  );
}
