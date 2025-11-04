import Image from "next/image";

export default function CommentList() {
  return (
    <div>
      <div className="flex justify-between mt-4">
        <p>댓글 내용</p>
        <button className="">
          <p className="font-bold text-2xl text-gray-400">︙</p>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Image
          className="bg-gray-300 rounded-full"
          src="/panda_ic.png"
          alt="아이콘"
          width={32}
          height={32}
        />
        <div>
          <p>똑똑한판다</p>
          <p>1시간전</p>
        </div>
      </div>
    </div>
  );
}
