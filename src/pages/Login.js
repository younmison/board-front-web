import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { userLogin } from "../api/user_api";
import { useDispatch } from "react-redux";
import { login } from "../modules/user";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const submitLogin = (userId, userPw, nav) => {
    if (userId?.trim().length === 0) return alert("아이디를 입력하세요");
    if (userPw?.trim().length === 0) return alert("비밀번호를 입력하세요");
    dispatch(login(userId, userPw, nav));
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      submitLogin(userId, userPw, nav);
    }
  };

  return (
    <PageContainer>
      <PageBox>
        <PageTitle>로그인</PageTitle>
        <Wrapper>
          <InputTitle>아이디</InputTitle>
          <InputId
            maxLength={20}
            autoComplete="off"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            onKeyDown={handleOnKeyPress}
          />
          <InputTitle>비밀번호</InputTitle>
          <InputPassword
            maxLength={25}
            autoComplete="off"
            type="password"
            onChange={(e) => {
              setUserPw(e.target.value);
            }}
            onKeyDown={handleOnKeyPress}
          />
        </Wrapper>
        <ButtonBox>
          <RegularButton
            onClick={() => {
              submitLogin(userId, userPw, nav);
            }}
          >
            로그인
          </RegularButton>
          <Link to="/join">
            <RegularButton>회원가입</RegularButton>
          </Link>
        </ButtonBox>
        <Link to="/findpassword">
          <LinkedText>비밀번호찾기</LinkedText>
        </Link>
      </PageBox>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-family: Pretendard;
`;
const PageBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PageTitle = styled.p`
  font-weight: 700;
  font-size: 2rem;
`;
const Wrapper = styled.div`
  width: 15rem;
  margin: 1rem 0;
`;
const InputTitle = styled.p`
  margin: 0.25rem 0;
`;
const InputId = styled.input`
  width: 100%;
  height: 1.5rem;
  font-family: Pretendard;
`;
const InputPassword = styled.input`
  width: 100%;
  height: 1.5rem;
  font-family: Pretendard;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const RegularButton = styled.div`
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #d0d0d0;
  font-family: Pretendard;
  font-size: 0.75rem;
  &:hover {
    color: white;
    background-color: gray;
  }
`;
const LinkedText = styled.p`
  padding: 1rem;
  text-decoration: underline;
  font-size: 0.75rem;
`;
export default Login;
