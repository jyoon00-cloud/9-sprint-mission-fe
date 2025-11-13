import { BtnSmall } from "./button";

export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80  flex items-center justify-center z-50">
      <div className="  flex flex-col justift-between bg-white gap-10 rounded-lg py-14 px-47 items-center w-fit h-fit sm:{w-82 h-55 px-22.5 py-5.75} ">
        <div className=" justify-center text-lg font-medium  leading-6.5">
          {children}
        </div>
        <div className="justify-center ">
          <BtnSmall onClick={onClose}>확인</BtnSmall>
        </div>
      </div>
    </div>
  );
}
