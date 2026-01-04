import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

interface ItemCardListProps {
  products: Product[];
}

export function ItemCardList({ products = [] }: ItemCardListProps) {
  return (
    <div>
      {products.map((product) => (
        <Link
          href={`/items/${product.id}`}
          key={product.id}
          className="flex flex-col items-start gap-6 w-85.75 md:w-174 xl:w-300 mb-6"
        >
          <div className="flex items-center gap-2 self-stretch">
            <div className="grow shrink-0 basis-0 text-xl leading-8 font-semibold">
              {product.name}
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
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-gray-500">
                  {product.price.toLocaleString("ko-kr")}원
                </p>
              </div>
              <div>
                <p className="text-gray-500">♡ 999+ </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
