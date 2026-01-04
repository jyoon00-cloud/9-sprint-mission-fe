import Image from "next/image";

interface CheckModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function CheckModal({ onClose, onConfirm }: CheckModalProps) {
  return (
    <div className="">
      <div className="">
        <Image src="/ic_check.png" alt="확인" width={24} height={24} />
        <p>정말로 상품을 삭제하시겠어요?</p>
        <button className="" onClick={onClose}>
          취소
        </button>
        <button className="" onClick={onConfirm}>
          네
        </button>
      </div>
    </div>
  );
}
