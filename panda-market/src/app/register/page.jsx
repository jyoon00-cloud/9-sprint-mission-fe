import { BtnLarge } from "@/components/ui/button";
import InputBox from "@/components/ui/inputBox";
import Image from "next/image";
import Link from "next/link";

export default function login() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-20">
      <div className="flex w-160 items-center justify-center gap-10 ">
        <Image src="/panda_logo.png" alt="판다마켓" width={100} height={100} />
        <h2 className="text-7xl font-bold text-blue-400">판다마켓</h2>
      </div>
      <div className="w-full">
        <p>이메일</p>
        <InputBox className="h-14 " placeholder="이메일을 입력해주세요." />
      </div>
      <div className="w-full">
        <p>닉네임</p>
        <InputBox className="h-14 " placeholder="닉네임을 입력해주세요." />
      </div>
      <div className="w-full">
        <p>비밀번호</p>
        <div className="flex relative">
          <InputBox
            className="h-14"
            placeholder="비밀번호를 입력해주세요."
            type="password"
          />
          <Image
            src="/btn_visibility_on_24px.png"
            alt="pw가리기"
            height={24}
            width={24}
            className="absolute right-3 top-1/2 transform -translate-y-1/2  cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full">
        <p>비밀번호 확인</p>
        <div className="flex relative">
          <InputBox
            className="h-14 pr-10"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            type="password"
          />
          <Image
            src="/btn_visibility_on_24px.png"
            alt="pw가리기"
            height={24}
            width={24}
            className="absolute right-3 top-1/2 transform -translate-y-1/2  cursor-pointer"
          />
        </div>
      </div>
      <BtnLarge>회원가입</BtnLarge>
      <div className="w-full flex bg-[#E6F2FF] p-4 rounded-lg justify-between items-center gap-8 py-4">
        <p>간편 로그인하기</p>
        <div className="flex mr-8 gap-4">
          <Image src="/kakaotalk.png" alt="카카오톡" width={42} height={42} />
          <Image src="/google.png" alt="구글" width={42} height={42} />
        </div>
      </div>
      <div className="w-full flex mb-72 gap-2 justify-center leading-6 text-sm">
        <p>이미 회원이신가요?</p>
        <Link href="/login" className="text-blue-400 underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
