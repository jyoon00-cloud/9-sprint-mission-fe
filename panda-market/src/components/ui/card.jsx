import Image from "next/image";
export function BestCard() {
  return (
    <div className=" flex w-96 h-42.25 pl-6 pr-6 flex-col items-center gap-2.5">
      <Image src="/img_badge.png" alt="BEST" width={102} height={30} />
      <div className="w-84 justify-center items-start gap-2">
        <p className="w-64 shrink-0 text-xl leading-8">
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </p>
        <Image src="/product1.png" alt="상품" width={48} height={44.5} />
      </div>
      <div className=" inline-flex gap-2 ">
        <div className="items-start">
          <p>닉네임</p>
          <p>♡ 0000+ </p>
        </div>
        <div> 0000.00.00</div>
      </div>
    </div>
  );
}

export function CardList() {
  return (
    <div className="flex flex-col items-start gap-6 w-85.75 md:w-174 xl:w-300">
      <div className="flex items-center gap-2 self-stretch">
        <div className="grow shrink-0 basis-0 text-xl leading-8 font-semibold">
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </div>
        <Image src="/product1.png" alt="상품" width={48} height={44.5} />
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
