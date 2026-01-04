"use client";
import { BtnLarge } from "@/components/ui/button";
import { SmallInput } from "@/components/ui/inputBox";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { postSignIn } from "@/lib/api/auth";

export default function SignIn() {
  const router = useRouter();
  const [pwVisibility, setPwVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [signInError, setSignInError] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/items");
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setModalMessage("모든 항목을 입력해주세요.");
      setIsModalOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await postSignIn(values);
      localStorage.setItem("accessToken", response.accessToken);
      router.push("/items");
    } catch (error) {
      setModalMessage("로그인에 실패했습니다. 다시 시도해주세요.");
      setIsModalOpen(true);
      setSignInError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {modalMessage}
        </Modal>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-8 mt-20"
      >
        <div className="flex w-160 items-center justify-center gap-10 ">
          <Image
            src="/panda_logo.png"
            alt="판다마켓"
            width={100}
            height={100}
          />
          <h2 className="text-7xl font-bold text-[#3692FF]">판다마켓</h2>
        </div>
        <div className="w-full">
          <p>이메일</p>
          <SmallInput
            className="h-14 "
            placeholder="이메일을 입력해주세요."
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {signInError && (
            <p className="text-red-500 text-sm mt-1">이메일을 확인해 주세요</p>
          )}
        </div>
        <div className="w-full">
          <p>비밀번호</p>
          <div className="flex relative">
            <SmallInput
              className="h-14 pr-11"
              placeholder="비밀번호를 입력해주세요."
              type={pwVisibility ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <div onClick={() => setPwVisibility(!pwVisibility)}>
              {pwVisibility ? (
                <Image
                  src="/btn_disvisibility.png"
                  alt="pw가리기"
                  height={24}
                  width={24}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2  cursor-pointer"
                />
              ) : (
                <Image
                  src="/btn_visibility.png"
                  alt="pw가리기"
                  height={24}
                  width={24}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2  cursor-pointer"
                />
              )}
            </div>
          </div>
          {signInError && (
            <p className="text-red-500 text-sm mt-1">
              {" "}
              비밀번호를 확인해 주세요
            </p>
          )}
        </div>
        <BtnLarge type="submit" disabled={isLoading}>
          로그인
        </BtnLarge>
        <div className="w-full flex bg-[#E6F2FF] p-4 rounded-lg justify-between items-center gap-8 py-4">
          <p>간편 로그인하기</p>
          <div className="flex mr-8 gap-4">
            <a href="https://google.com">
              <Image src="/google.png" alt="구글" width={42} height={42} />
            </a>
            <a href="https://kakaotalk.com">
              <Image
                src="/kakaotalk.png"
                alt="카카오톡"
                width={42}
                height={42}
              />
            </a>
          </div>
        </div>
        <div className="w-full flex mb-72 justify-center gap-2 leading-6 text-sm">
          <p>판다마켓이 처음이신가요?</p>

          <Link href="/signUp" className="text-blue-400 underline">
            회원가입
          </Link>
        </div>
      </form>
    </>
  );
}
