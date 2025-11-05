import { BtnSmall } from "@/components/ui/button";
import InputBox from "@/components/ui/inputBox";
export default function WriteForum() {
  return (
    <div className="w-full max-w-400 mx-auto p-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold leading-8">게시글 쓰기</h2>
        <BtnSmall className="bg-gray-400 text-gray-100">등록</BtnSmall>
      </div>
      <div>
        <p>*제목</p>
        <InputBox placeholder="제목을 입력해주세요" className="h-14"></InputBox>
      </div>
      <div>
        <p>*내용</p>
        <InputBox placeholder="내용을 입력해주세요" className="h-71"></InputBox>
      </div>
    </div>
  );
}
