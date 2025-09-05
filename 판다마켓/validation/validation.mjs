import { USER_DATA } from "./userdata.mjs";

function isInputEmpty(value){ // 공백 확인
  return value.trim() === '' ; 
}

function isValidEmail(email){
  return /^\S+@\S+\.\S+$/.test(email); // 메일 유효성 검사
}

function isValidPwLength(password){ // pw 길이
  return password.length >= 8;
}

function isEmailDatabase(email){ // db에 있는 메일인지
  return USER_DATA.some(user => user.email === email)
}

function errorMessage(input,errorElement,message){ // 에러 메시지 표시
  const targetElement = input.type ==='password' ? input.parentElement:input;
  targetElement.classList.add('input-error');
  errorElement.textContent = message;
}

function clearMessage(input,errorElement){ //에러 메시지 삭제
  const targetElement = input.type ==='password' ? input.parentElement:input;
  targetElement.classList.remove('input-error');
  errorElement.textContent = '';
}

function validCommonEmail(input , errorElement){ //회원가임 및 로그인 공용 이메일 검사
  const email = input.value;
  if (isInputEmpty(email)){ //이메일 공백 에러
    errorMessage(input , errorElement , '이메일을 입력해주세요.')
    return false;
  }
  if(!isValidEmail(email)){ //이메일 형식 에러
    errorMessage(input , errorElement, '잘못된 이메일 형식입니다.')
    return false;
  }
  return true; // 에러 없음
}

function validCommonPw(input , errorElement){ //회원가임 및 로그인 공용 pw 검사
  const password = input.value;
  if (isInputEmpty(password)){ //pw 공백 에러
    errorMessage(input , errorElement , '비밀번호를 입력해주세요.')
    return false;
  }
  if(!isValidPwLength(password)){ //pw 길이 에러
    errorMessage(input , errorElement, '비밀번호를 8자 이상 입력해주세요.')
    return false;
  }
  return true; // 에러 없음
}

export {
   isInputEmpty,
    isValidEmail,
    isValidPwLength,
    isEmailDatabase,
    errorMessage,
    clearMessage,
    validCommonEmail,
    validCommonPw
}