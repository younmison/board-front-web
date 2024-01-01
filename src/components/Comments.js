/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getComment, handleDelete, writeContent } from "../api/comment_api";
import styled from "styled-components";
import EditComment from "./EditComment";
import { useSelector } from "react-redux";

const Comments = (boardId) => {
  const id = boardId.boardId;

  const nickname = useSelector((state) => state.user.username);

  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [clickedId, setClickedId] = useState(0);

  const getData = async () => {
    const commentData = await getComment(id);
    if (commentData === false) {
      return [];
    }
    return setData(commentData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CommentArea>
      <Title>댓글</Title>
      <WriteCommentBox>
        <WriteComment
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <SubmitButton
          onClick={() => {
            writeContent(id, content, nickname);
          }}
        >
          등록
        </SubmitButton>
      </WriteCommentBox>
      {data?.map((item) => (
        <CommentBox key={item.comment_id}>
          <CommentInfo>
            <CommentWriter>{item.nickname}</CommentWriter>
            {/* <CommentAt>{item.updatedAt}</CommentAt> */}
            <CommentAt>{new Date(item.updatedAt).toLocaleString()}</CommentAt>
          </CommentInfo>
          {isEdit && clickedId === item.comment_id ? (
            <EditComment value={item.comment_content} id={item.comment_id} nickname={item.nickname} />
          ) : (
            <CommentContent>{item.comment_content}</CommentContent>
          )}
          {nickname === item.nickname ? (
            <>
              {isEdit && clickedId === item.comment_id ? (
                <ButtonBox>
                  <Button
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    취소
                  </Button>
                </ButtonBox>
              ) : (
                <ButtonBox>
                  <Button
                    onClick={() => {
                      setClickedId(item.comment_id);
                      const id = item.comment_id;
                      setEdit(true);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(item.comment_id);
                    }}
                  >
                    삭제
                  </Button>
                </ButtonBox>
              )}
            </>
          ) : (
            <></>
          )}
        </CommentBox>
      ))}
    </CommentArea>
  );
};

const CommentArea = styled.div`
  width: 70%;
  height: fit-content;
  font-family: Pretendard;
`;
const Title = styled.p`
  padding: 1rem 0;
  font-weight: 700;
  font-size: 1.25rem;
`;
const WriteCommentBox = styled.div`
  width: 100%;
  display: flex;
`;
const WriteComment = styled.input`
  width: 90%;
  height: 4rem;
  margin-right: 1rem;
`;
const CommentBox = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  background-color: #eee;
  padding: 1rem;
`;
const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
`;
const CommentWriter = styled.span`
  font-weight: 700;
`;
const CommentAt = styled.span``;
const CommentContent = styled.div`
  width: 100%;
  height: fit-content;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;
const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
const SubmitButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
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
export default Comments;
