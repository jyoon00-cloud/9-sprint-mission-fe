//공용 모듈
import {
    isEmailDatabase,
    errorMessage,
    clearMessage,
    validCommonEmail,
    validCommonPw
} from '../validation/validation.mjs'


//필요한 요소 선언
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const signupBtn = document.querySelector('.signup-btn');  
const emailError = emailInput.nextElementSibling;
const passwordError = passwordInput.parentElement.nextElementSibling;
const confirmPasswordError = confirmPasswordInput.parentElement.nextElementSibling;
const visibilityBtns = document.querySelectorAll('.visibility-btn');

//이메일 유효성검사
function signupEmail(){
    const isCommonValid = validCommonEmail(emailInput,emailError)
    if (!isCommonValid) return false;
    clearMessage(emailInput,emailError)
    return true;
}

// pw 유효성 검사
function signupPw(){
    const isCommonValid = validCommonPw(passwordInput,passwordError);
    if(isCommonValid){
        clearMessage(passwordInput,passwordError);
    }
    return isCommonValid;
}

//pw 확인 유효성 검사
function confirmPassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage(confirmPasswordInput, confirmPasswordError, '비밀번호가 일치하지 않습니다.');
        return false;
    }
    clearMessage(confirmPasswordInput, confirmPasswordError);
    return true;
}

//버튼 활성화/비활성화
function updateButtonState(){
    const isEmailBlank = emailError.textContent === '';
    const isPwBlank = passwordError.textContent === '';
    const confirmBlank = confirmPasswordError.textContent === '';
    const areaInputFilled = emailInput.value !== '' && passwordInput.value !== '' &&  confirmPasswordInput.value !== '';
    if(isEmailBlank && isPwBlank && confirmBlank && areaInputFilled){
        signupBtn.disabled = false;
    }else{
        signupBtn.disabled = true;
    }
}

//이벤트 
// focustout시 유효성검사 실행
emailInput.addEventListener('focusout',()=>{ 
    signupEmail();
    updateButtonState();
});

passwordInput.addEventListener('focusout',()=>{ 
    signupPw();
    updateButtonState();
});

confirmPasswordInput.addEventListener('focusout',()=>{ 
    confirmPassword();
    updateButtonState();
});

// 인풋시 버튼 업데이트
form.addEventListener('input',updateButtonState);

// 비밀번호 보이기 버튼
visibilityBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const input = index === 0 ? passwordInput : confirmPasswordInput;

        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    });
});

// 회원가입 버튼
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const isSignupValid = signupEmail() && signupPw() &&  confirmPassword();
    if(isEmailDatabase(emailInput.value)){
        alert('사용 중인 이메일입니다')
    }
    else if(isSignupValid){
        window.location.href = '../login/index.html';
    }
});