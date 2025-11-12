import Image from "next/image";
export default function CheckModal() {
  return (
    <div className="">
      <div className="">
        <Image src="/ic_check.png" alt="확인" width={24} height={24} />
        <p>정말로 상품을 삭제하시겠어요?</p>
        <button className="">취소</button>
        <button className="">네</button>
      </div>
    </div>
  );
}
