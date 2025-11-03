import Image from "next/image";
import Link from "next/link";
import { BtnSmall } from "../ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="h-17.5 flex mx-auto justify-between items-center w-auto">
        <div className="flex gap  items-center">
          <Link href="/" className="flex gap-4">
            <Image
              src="/panda_title.png"
              width={153}
              height={51}
              alt="판다마켓"
            />
          </Link>
          <div className="text-xl font-bold">
            <Link href="/forum" className="text-blue-500 m-6">
              자유게시판
            </Link>
            <Link href="/store" className=" m-6">
              중고마켓
            </Link>
          </div>
        </div>
        <div>
          <Link href="/login">
            <BtnSmall>로그인</BtnSmall>
          </Link>
        </div>
      </div>
    </header>
  );
}
