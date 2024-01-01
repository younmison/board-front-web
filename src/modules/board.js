const init = {
  pageNum: 1,
  num: 10,
  target: 0,
  value: "",
};

export const getPageNumber = (pageNum, SHOW_ARTICLE_NUM, target, value) => {
  return (dispatch) => {
    dispatch({ type: "GET_PAGE_NUMBER", payload: { pageNum, SHOW_ARTICLE_NUM, target, value } });
  };
};

export default function board(state = init, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_PAGE_NUMBER": {
      return {
        ...state,
        pageNum: payload.board.pageNum,
        num: 10,
        target: payload.board.target,
        value: payload.board.value,
      };
    }

    default:
      return { ...state };
  }
}
