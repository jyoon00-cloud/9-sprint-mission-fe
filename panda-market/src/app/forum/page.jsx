import { BtnSmall } from "@/components/ui/button";
import { BestCard, CardList } from "@/components/ui/card";
import DropDown from "@/components/ui/dropdown";
import InputBox from "@/components/ui/inputBox";

export default function ForumHome() {
  return (
    <div className="w-auto">
      <div className="m-20">
        <h2>베스트 게시글</h2>
        <div className="flex">
          <BestCard />
          <BestCard />
          <BestCard />
        </div>
      </div>
      <div className="flex flex-col m-10">
        {/* 게시글 목록 */}
        <div className="justify-between w-300  items-center flex">
          <h2 className="font-bold text-xl">게시글</h2>
          <BtnSmall className="text-white">글쓰기</BtnSmall>
        </div>
        <div className="flex w-250 justify-center items-center">
          <InputBox
            className="w-full"
            placeholder="검색할 상품을 입력해주세요"
          ></InputBox>
          <DropDown />
        </div>
        <div className="">
          <CardList />
          <CardList />
          <CardList />
          <CardList />
        </div>
      </div>
    </div>
  );
}
