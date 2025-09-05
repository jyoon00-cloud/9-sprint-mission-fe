// 공용 모듈 임포트
import {
    validCommonEmail, 
    validCommonPw,
    clearMessage
} from '../validation/validation.mjs'
import { USER_DATA } from '../validation/userdata.mjs';

// 요소 선언
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const emailError = emailInput.nextElementSibling;
const passwordError = passwordInput.parentElement.parentElement.querySelector('.error-message');
const visibilityBtn = document.querySelector('.visibility-btn')

//이메일 확인
function loginEmail(){
    const isCommonValid = validCommonEmail(emailInput,emailError);
    if(isCommonValid){
        clearMessage(emailInput,emailError);
    }
}

//비밀번호 확인
function loginPw(){
    const isCommonValid = validCommonPw(passwordInput, passwordError);
    if (isCommonValid) {
        clearMessage(passwordInput, passwordError);
    }
}

// 버튼 활성화
function updateButtonState() {
    const isEmailValid = emailError.textContent === '' && emailInput.value !== '';
    const isPasswordValid = passwordError.textContent === '' && passwordInput.value !== '';

    if (isEmailValid && isPasswordValid) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}


// focusout시 메일,비번 확인
emailInput.addEventListener('focusout', () => {
    loginEmail();
    updateButtonState();
});

passwordInput.addEventListener('focusout', () => {
    loginPw();
    updateButtonState();
});

//입력시 로그인버튼 활성화
form.addEventListener('input', updateButtonState);

// 비밀번호 보이기 버튼
visibilityBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        visibilityBtn.querySelector('img').src = '../img/btn_visibility.png';
    } else {
        passwordInput.type = 'password';
        visibilityBtn.querySelector('img').src = '../img/btn_visibility.png';
    }
});

// 로그인 버튼
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputEmail = emailInput.value;
    const inputPassword = passwordInput.value;
    const user = USER_DATA.find(user => user.email === inputEmail);
    if (user && user.password === inputPassword) {
        window.location.href = "/items";
    } else {
        alert('비밀번호가 일치하지 않습니다.'); 
    } 
});
