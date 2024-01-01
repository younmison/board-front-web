import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { saveNewPassword } from "../api/user_api";

const SetPassword = () => {
  const nav = useNavigate();
  const location = useLocation();
  const checkRef = useRef();

  const account = location.state.account;
  const userToken = location.state.token;

  const [newPassword, setNewPassword] = useState("");
  const [isValidate, setValidate] = useState(false);
  const [checkSame, setCheckSame] = useState(false);

  const userInputsHandler = (e) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const inputs = e.target.value;
    const test = regExp.test(inputs);
    if (test === true) {
      setNewPassword(inputs);
      setValidate(true);
      return newPassword;
    }
    return setValidate(false);
  };

  const checkPwValidate = (e) => {
    const { value } = e.target;
    if (newPassword) {
      if (newPassword === value) {
        checkRef.current.style.border = "1px solid black";
        return setCheckSame(true);
      } else {
        checkRef.current.style.border = "2px solid red";
        return setCheckSame(false);
      }
    }
    return setValidate(false);
  };

  const submitInfo = () => {
    if (newPassword.length !== 0 && checkSame === true && isValidate === true) {
      return saveNewPassword(userToken, newPassword, account, nav);
    }
    return alert("유효하지 않은 값입니다");
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      submitInfo();
    }
  };

  return (
    <PageContainer>
      <PageBox>
        <PageTitle>비밀번호 재설정</PageTitle>
        <Wrapper>
          <InputTitle>새로운 비밀번호</InputTitle>
          <InputBox
            type="password"
            name="password"
            onChange={(e) => {
              userInputsHandler(e);
            }}
            onKeyDown={handleOnKeyPress}
          />
          <CheckResult>영문, 숫자 1개 이상 포함(최소 8자)</CheckResult>
          <InputTitle>비밀번호 확인</InputTitle>
          <InputBox
            ref={checkRef}
            type="password"
            name="checkPassword"
            onChange={(e) => {
              checkPwValidate(e);
            }}
            onKeyDown={handleOnKeyPress}
          />
        </Wrapper>
        <ButtonBox>
          <RegularButton
            onClick={() => {
              submitInfo();
            }}
          >
            완료
          </RegularButton>
        </ButtonBox>
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
const PageBox = styled.div`
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
const InputBox = styled.input`
  width: 100%;
  height: 1.5rem;
  margin-bottom: 0.5rem;
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
const CheckResult = styled.p`
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
`;
export default SetPassword;
