import React from "react";
import styled from "styled-components";

const Search = ({ submitSearch, searchValue, setSearchValue }) => {
  const selectHandler = (e) => {
    const { value, name } = e.target;
    setSearchValue({ ...searchValue, [name]: value });
  };

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setSearchValue({ ...searchValue, [name]: value });
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  return (
    <SearchBox>
      <SelectBox
        name="target"
        onChange={(e) => {
          selectHandler(e);
        }}
      >
        <SearchOptions value={0}>제목</SearchOptions>
        <SearchOptions value={1}>내용</SearchOptions>
        <SearchOptions value={2}>제목+내용</SearchOptions>
      </SelectBox>
      <SearchInput
        name="value"
        onChange={(e) => {
          inputHandler(e);
        }}
        onKeyDown={handleOnKeyPress}
      />
      <SearchButton
        onClick={() => {
          submitSearch();
        }}
      >
        검색
      </SearchButton>
    </SearchBox>
  );
};

const SearchBox = styled.form`
  box-sizing: border-box;
  border: 1px solid black;
  background-color: transparent;
  margin: 0.5rem 0;
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;
const SearchInput = styled.input`
  width: 15rem;
  padding: 0 0.5rem;
  border: none;
`;
const SearchButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0.5rem;
  @media screen and (max-width: 500px) {
    font-size: 0.5rem;
  }
`;
const SelectBox = styled.select`
  border: none;
  padding: 0 0.5rem;
  @media screen and (max-width: 500px) {
    font-size: 0.5rem;
  }
`;
const SearchOptions = styled.option``;
export default Search;
