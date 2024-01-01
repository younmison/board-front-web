import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { writeContent } from "../api/board_api";
import { useSelector } from "react-redux";

const Write = () => {
  const nav = useNavigate();
  const [userInputs, setUserInputs] = useState({
    title: "",
    content: "",
  });

  const writer = useSelector((state) => state.user.username);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const submitArticle = () => {
    const title = userInputs.title;
    const content = userInputs.content;
    if (title.length !== 0 && content.length !== 0 && writer !== undefined) {
      return writeContent(title, content, writer, nav);
    }
    return alert("제목과 내용을 입력하세요");
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>글쓰기</PageTitle>
        <RightArea>
          <Link to="/board">
            <Button>취소</Button>
          </Link>
          <Link to="/write">
            <Button
              onClick={() => {
                submitArticle();
              }}
            >
              등록하기
            </Button>
          </Link>
        </RightArea>
      </PageHeader>
      <WriteTitleArea
        name="title"
        placeholder="제목을 입력하세요"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <WriteContentArea
        name="content"
        placeholder="내용을 입력하세요"
        onChange={(e) => {
          handleInput(e);
        }}
      />
    </PageContainer>
  );
};

const Button = styled.div`
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
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100vw;
  height: 100vh;
  font-family: Pretendard;
`;
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
`;
const RightArea = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const PageTitle = styled.p`
  font-weight: 700;
  font-size: 2rem;
`;
const WriteTitleArea = styled.input`
  width: 70%;
  padding: 0.75rem;
  box-sizing: border-box;
  border: 1px solid black;
`;
const WriteContentArea = styled.textarea`
  width: 70%;
  height: 70%;
  padding: 0.75rem;
  box-sizing: border-box;
  border: 1px solid black;
  resize: none;
`;
export default Write;
