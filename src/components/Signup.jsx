import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Form.css";

export default function Signup() {
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

  const signup = () => {
    axios({
      url: "https://www.pre-onboarding-selection-task.shop/auth/signup",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("succcess");
          navigate("/signin");
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <h1>회원가입</h1>

      <input
        data-testid="email-input"
        className="e-input"
        placeholder="이메일을 입력하세요"
        onChange={handleEmail}
      />
      <p>{emailMsg}</p>

      <input
        data-testid="password-input"
        className="pwd-input"
        placeholder="비밀번호를 입력하세요"
        type={"password"}
        onChange={handlePwd}
      />
      <p>{pwdMsg}</p>
      <button
        data-testid="signup-button"
        onClick={() => signup()}
        disabled={!isEmailValid || !isPwdValid}
      >
        회원가입
      </button>
    </div>
  );
}
