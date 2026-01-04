"use client";
import { BtnLarge } from "@/components/ui/button";
import { SmallInput, InputBox } from "@/components/ui/inputBox";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { postSignUp } from "@/lib/api/auth";
import Modal from "@/components/ui/modal";

export default function SignUp() {
  const router = useRouter();
  const [pwVisibility, setPwVisibility] = useState(false);
  const [checkVisibility, setCheckVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordRepeat: "",
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/items");
    }
  }, [router]);

  useEffect(() => {
    if (values.passwordRepeat && values.password !== values.passwordRepeat) {
      setPasswordError("비밀번호가 일치하지 않아요.");
    } else setPasswordError("");
  }, [values.password, values.passwordRepeat]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordError) {
      setModalMessage("비밀번호가 일치하지 않습니다.");
      setIsModalOpen(true);
      return;
    }
    if (!values.email || !values.nickname || !values.password) {
      setModalMessage("모든 항목을 입력해주세요.");
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const SignUpData = {
        email: values.email,
        nickname: values.nickname,
        password: values.password,
        passwordConfirmation: values.passwordRepeat,
      };
      const response = await postSignUp(SignUpData);

      localStorage.setItem("accessToken", response.accessToken);
      router.push("/items");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      setModalMessage(errorMessage);
      setIsModalOpen(true);
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
          <InputBox
            className="h-14 "
            placeholder="이메일을 입력해주세요."
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p>닉네임</p>
          <InputBox
            className="h-14 "
            placeholder="닉네임을 입력해주세요."
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
          />
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
                  alt="pw보이기"
                  height={24}
                  width={24}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2  cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <p>비밀번호 확인</p>
          <div className="flex relative">
            <SmallInput
              className="h-14 pr-11"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              type={checkVisibility ? "text" : "password"}
              name="passwordRepeat"
              value={values.passwordRepeat}
              onChange={handleChange}
            />
            <div onClick={() => setCheckVisibility(!checkVisibility)}>
              {checkVisibility ? (
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
                  alt="pw보이기"
                  height={24}
                  width={24}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2  cursor-pointer"
                />
              )}
            </div>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <BtnLarge type="submit" disabled={isLoading}>
          회원가입
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
        <div className="w-full flex mb-72 gap-2 justify-center leading-6 text-sm">
          <p>이미 회원이신가요?</p>
          <Link href="/signIn" className="text-blue-400 underline">
            로그인
          </Link>
        </div>
      </form>
    </>
  );
}
