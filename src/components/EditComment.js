/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { handleEdit } from "../api/comment_api";

const EditComment = ({ value, id, nickname }) => {
  useEffect(() => {
    setContent({
      content: value,
    });
  }, []);

  const [content, setContent] = useState({
    content: "",
  });

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  };

  const contentData = content.content;
  return (
    <WriteCommentBox>
      <WriteComment
        name="content"
        value={content.content}
        onChange={(e) => {
          inputHandler(e);
        }}
      />
      <SubmitButton
        onClick={() => {
          handleEdit(contentData, id, nickname);
        }}
      >
        등록
      </SubmitButton>
    </WriteCommentBox>
  );
};
const WriteCommentBox = styled.div`
  width: 100%;
  display: flex;
`;
const WriteComment = styled.input`
  width: 90%;
  height: 4rem;
  margin-right: 1rem;
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
export default EditComment;
