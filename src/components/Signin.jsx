import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  const emailReg = /\S+@\S+\.\S+/;
  const isEmailValid = emailReg.test(email);
  const isPwdValid = password.length >= 7;

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      navigate("/todo");
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (!isEmailValid) {
      setEmailMsg("유효하지 않은 이메일입니다.");
    } else {
      setEmailMsg("");
    }
  };
  const handlePwd = (e) => {
    setPassword(e.target.value);
    if (!isPwdValid) {
      setPwdMsg("비밀번호는 8자리 이상 입력해주세요");
    } else {
      setPwdMsg("");
    }
  };

  const signin = () => {
    axios({
      url: "https://www.pre-onboarding-selection-task.shop/auth/signin",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      localStorage.setItem("access_token", response.data.access_token);
      console.log(response.data);
      navigate("/todo");
    });
  };

  return (
    <div className="container">
      <h2>로그인</h2>
      이메일
      <input
        data-testid="email-input"
        placeholder="이메일을 입력하세요"
        onChange={handleEmail}
      />
      <p>{emailMsg}</p>
      비밀번호
      <input
        data-testid="password-input"
        placeholder="비밀번호를 입력하세요"
        type={"password"}
        onChange={handlePwd}
      />
      <p>{pwdMsg}</p>
      <button
        data-testid="signin-button"
        onClick={() => signin()}
        disabled={!isEmailValid || !isPwdValid}
      >
        로그인
      </button>
    </div>
  );
}
