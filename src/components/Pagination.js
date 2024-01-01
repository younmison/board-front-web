import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getPageNumber } from "../modules/board";

// 페이지 전체 개수 받아오기
const Pagination = ({ lastPage }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pageNum = 1;

  const array = [];
  for (let i = 0; i < lastPage; i++) {
    array.push(i + 1);
  }

  const result = Math.floor((pageNum - 1) / 10);
  const offset = result * 10;

  return (
    <PagingBox>
      <StartArrow
      // onClick={() => {
      //   1;
      // }}
      >
        {pageNum === 1 ? "" : "<<"}
      </StartArrow>
      <PrevArrow
      // onClick={() => {
      //   if (pageNum > 1) {
      //     pageNum - 1;
      //   }
      // }}
      >
        {pageNum === 1 ? "" : "<"}
      </PrevArrow>
      {array.slice(offset, offset + 10).map((item, idx) => (
        <Emptydiv key={idx}>
          {pageNum === item ? (
            <ActivePageNumber
            // onClick={() => {
            //   item;
            // }}
            >
              {item}
            </ActivePageNumber>
          ) : (
            <PageNumber
              onClick={() => {
                dispatch(getPageNumber(item, 10, 0, ""));
              }}
            >
              {item}
            </PageNumber>
          )}
        </Emptydiv>
      ))}
      <NextArrow
      // onClick={() => {
      //   if (pageNum < lastPage) {
      //     pageNum + 1;
      //   }
      // }}
      >
        {pageNum === lastPage ? "" : ">"}
      </NextArrow>
      <LastArrow
      // onClick={() => {
      //   lastPage;
      // }}
      >
        {pageNum === lastPage ? "" : ">>"}
      </LastArrow>
    </PagingBox>
  );
};

const PagingBox = styled.div`
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 70%;
  margin: 1.5rem 0;
  @media screen and (max-width: 500px) {
    gap: 0.5rem;
  }
`;
const StartArrow = styled.span`
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`;
const PrevArrow = styled.span`
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`;
const Emptydiv = styled.div``;
const ActivePageNumber = styled.span`
  cursor: pointer;
  color: blue;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`;
const PageNumber = styled.span`
  cursor: pointer;

  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`;
const NextArrow = styled.span`
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`;
const LastArrow = styled.span`
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`;
export default Pagination;
