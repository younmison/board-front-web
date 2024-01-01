/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { handleEdit } from "../api/board_api";
import { useSelector } from "react-redux";

const Edit = () => {
  const nav = useNavigate();
  const location = useLocation();

  const data = location.state.data;
  const boardId = data.board_id;
  const loginedUser = useSelector((state) => state.user.username);

  useEffect(() => {
    setUserInputs({
      title: data.title,
      content: data.content,
      writer: data.writer,
    });
    setIsDate(new Date(data.createdAt).toLocaleString());
  }, []);

  const [isDate, setIsDate] = useState("");
  const [userInputs, setUserInputs] = useState({
    title: "",
    content: "",
  });

  const { title, content, writer } = userInputs;
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          name="title"
          value={title}
          onChange={(e) => {
            inputHandler(e);
          }}
        />
      </PageHeader>
      <ArticleDetails>
        <RightArea>작성자 : {writer}</RightArea>
        <RightArea>작성일 : {isDate}</RightArea>
      </ArticleDetails>
      <ContentArea
        name="content"
        value={content}
        onChange={(e) => {
          inputHandler(e);
        }}
      />
      {data.writer === loginedUser ? (
        <PageBottom>
          <Button
            onClick={() => {
              handleEdit(title, content, boardId, writer, nav);
            }}
          >
            수정 완료
          </Button>
          <Button
            onClick={() => {
              nav("/board");
            }}
          >
            취소
          </Button>
        </PageBottom>
      ) : (
        <></>
      )}
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
const PageBottom = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
`;
const RightArea = styled.p``;
const ArticleDetails = styled.div`
  display: flex;
  gap: 1rem;
  width: 70%;
  text-align: left;
  font-size: 0.75rem;
`;
const PageTitle = styled.input`
  overflow: hidden;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  font-weight: 700;
  font-size: 2rem;
`;
const ContentArea = styled.textarea`
  width: 70%;
  height: 70%;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid black;
  line-height: 1.25rem;
  resize: none;
`;
export default Edit;
