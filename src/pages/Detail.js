/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostAll, handleDelete } from "../api/board_api";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";

const Detail = () => {
  const nav = useNavigate();
  const location = useLocation();

  const state = location.state;
  const data = state ? location.state.data : Number(location.pathname.substring(7));
  const boardId = data.board_id;

  const [isDate, setIsDate] = useState("");

  useEffect(() => {
    setIsDate(new Date(data.updatedAt).toLocaleString());
  }, [data.createdAt]);

  const loginedUser = useSelector((state) => state.user.username);

  return (
    <PageContainer>
      <BackBtn
        onClick={() => {
          nav(`/board`);
        }}
      >
        {"<< 목록으로"}
      </BackBtn>
      <PageHeader>
        <PageTitle>{data.title}</PageTitle>
      </PageHeader>
      <ArticleDetails>
        <RightArea>작성자 : {data.writer}</RightArea>
        <RightArea>작성일 : {isDate}</RightArea>
      </ArticleDetails>
      <ContentArea>{data.content}</ContentArea>
      {data.writer === loginedUser ? (
        <PageBottom>
          <Button
            onClick={() => {
              nav(`/board/${boardId}/edit`, {
                state: {
                  data: data,
                },
              });
            }}
          >
            수정
          </Button>
          <Button
            onClick={() => {
              handleDelete(boardId, nav);
            }}
          >
            삭제
          </Button>
        </PageBottom>
      ) : (
        <></>
      )}
      <Comments boardId={boardId} />
    </PageContainer>
  );
};
const BackBtn = styled.div`
  cursor: pointer;
  width: 70%;
  font-size: 0.75rem;
`;
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
  padding: 2rem 0;
  width: 100vw;
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
const RightArea = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 0.85rem;
  }
`;
const ArticleDetails = styled.div`
  display: flex;
  gap: 1rem;
  width: 70%;
  text-align: left;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;
const PageTitle = styled.p`
  overflow: hidden;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  font-weight: 700;
  font-size: 2rem;
`;
const ContentArea = styled.div`
  width: 70%;
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid black;
  line-height: 1.25rem;
  resize: none;
`;
export default Detail;
