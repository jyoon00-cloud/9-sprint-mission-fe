import { BtnSmall } from "@/components/ui/button";
import { BestCard, CardList } from "@/components/ui/forumCard";
import Link from "next/link";
import { getArticles } from "@/lib/api/article";
import ForumList from "@/components/ui/forumList";

export default async function ForumHome() {
  const initialArticlesData = await getArticles({ orderBy: "recent" });
  const orderBestArticles = await getArticles({ orderBy: "likes" });
  const bestArticles = (orderBestArticles?.data || []).slice(0, 3);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-400 ">
        <div className="m-20 ">
          <h2 className="font-bold text-xl text-gray-900">베스트 게시글</h2>
          <div className="flex">
            {bestArticles.map((art) => (
              <BestCard key={art.id} article={art} />
            ))}
          </div>
        </div>
        <div className="flex flex-col mx-20 mb-10">
          <div className="max-w-300 justify-between w-full  items-center flex mb-4">
            <h2 className="font-bold text-xl">게시글</h2>
            <Link href="/forum/post" className="">
              <BtnSmall className="text-white ">글쓰기</BtnSmall>
            </Link>
          </div>
          <ForumList initialArticles={initialArticlesData.data || []} />
        </div>
      </div>
    </div>
  );
}
