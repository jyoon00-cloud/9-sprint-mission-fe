import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";

interface BestCardProps {
  article: Article;
}

export function BestCard({ article }: BestCardProps) {
  return (
    <div className="flex w-96 h-42.25 pl-6 pr-6 flex-col items-center gap-2.5">
      <Image src="/img_badge.png" alt="BEST" width={102} height={30} />
      <div className="w-84 justify-center items-start gap-2">
        <p className="w-84 shrink-0 text-xl leading-8 font-semibold ">
          {article.title}
        </p>
        <Image src="/product1.png" alt="상품" width={48} height={44.5} />
      </div>
      <div className="inline-flex gap-2 content-between w-full justify-between items-center">
        <div className="flex gap-2">
          <p className="text-gray-600">닉네임</p>
          <p className="text-gray-500">♡ 0000+ </p>
        </div>
        <div className="text-gray-400"> 0000.00.00</div>
      </div>
    </div>
  );
}

export function CardList({ articles = [] }: { articles: Article[] }) {
  return (
    <div>
      {articles.map((article) => (
        <Link
          href={`/forum/${article.id}`}
          key={article.id}
          className="flex flex-col items-start gap-6 w-85.75 md:w-174 xl:w-300 mb-6"
        >
          <div className="flex items-center gap-2 self-stretch">
            <div className="grow shrink-0 basis-0 text-xl leading-8 font-semibold">
              {article.title}
            </div>
            <Image src="/product1.png" alt="상품" width={48} height={44.5} />
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-4">
              <Image
                src="/panda_ic.png"
                alt="아이콘"
                width={24}
                height={24}
                className="bg-gray-400 rounded-full"
              />
              <p className="font-semibold"> 닉네임 </p>
              <p className="text-gray-400">
                {" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">♡ 999+ </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
