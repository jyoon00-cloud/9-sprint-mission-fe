import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 items-center justify-center pl-50 pr-50">
      <div className="w-auto h-40 flex justify-between items-center text-gray-400 ">
        <p>@codeit - 2024</p>
        <div className="flex gap-7.5 ">
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>
        <div className="flex gap-3">
          <Link href={"https://www.facebook.com"}>
            <Image
              src="/ic_facebook.png"
              width={20}
              height={20}
              alt="Facebook"
            />
          </Link>
          <Link href={"https://www.twitter.com"}>
            <Image src="/ic_twitter.png" width={20} height={20} alt="Twitter" />
          </Link>
          <Link href={"https://www.youtube.com"}>
            <Image src="/ic_youtube.png" width={20} height={20} alt="Youtube" />
          </Link>
          <Link href={"https://www.instagram.com"}>
            <Image
              src="/ic_instagram.png"
              width={20}
              height={20}
              alt="Instagram"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
