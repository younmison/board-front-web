import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { checkAnswer } from "../api/user_api";

const QUESTION = [
  { id: 1, question: "어릴 때 살던 동네는?" },
  { id: 2, question: "가장 아끼는 보물 1호는?" },
  { id: 3, question: "기억에 남는 장소는?" },
];

const FindPassword = () => {
  const nav = useNavigate();
  const [userInputs, setUserInputs] = useState({
    id: "",
    question: "1",
    answer: "",
  });

  const userInputsHandler = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const submitInfo = async () => {
    const { id, question, answer } = userInputs;
    if (id.length !== 0 && question.length !== 0 && answer.length !== 0) {
      const result = await checkAnswer(id, question, answer, nav);
      if (result === false || result === undefined) return alert("일치하는 정보가 없습니다");
    }
    if (id.length === 0) return alert("아이디를 입력하세요");
    if (answer.length === 0) return alert("답변을 입력하세요");
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      submitInfo();
    }
  };

  return (
    <PageContainer>
      <PageBox>
        <PageTitle>비밀번호 찾기</PageTitle>
        <Wrapper>
          <InputTitle>아이디</InputTitle>
          <InputBox
            name="id"
            onChange={(e) => {
              userInputsHandler(e);
            }}
            onKeyDown={handleOnKeyPress}
          />
          <InputTitle>질문</InputTitle>
          <QuestionBox
            name="question"
            onChange={(e) => {
              userInputsHandler(e);
            }}
          >
            {QUESTION.map((item) => (
              <QuestionTitle key={item.id} value={item.id}>
                {item.question}
              </QuestionTitle>
            ))}
          </QuestionBox>
          <InputTitle>답변</InputTitle>
          <InputBox
            name="answer"
            onChange={(e) => {
              userInputsHandler(e);
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
            답변제출
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
const InputBox = styled.input`
  width: 100%;
  height: 1.5rem;
  margin-bottom: 1rem;
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
const QuestionBox = styled.select`
  width: 100%;
  height: 1.5rem;
  margin-bottom: 1rem;
`;
const QuestionTitle = styled.option``;

export default FindPassword;
