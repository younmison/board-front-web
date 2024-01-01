import api from "./index";

export const getPostAll = (pageNum, SHOW_ARTICLE_NUM) => {
  return api
    .get("board/list", { params: { page: pageNum, num: SHOW_ARTICLE_NUM } })
    .then((res) => {
      if (res.status === 200) {
        const searchData = res.data.data.getList;
        const countNum = res.data.data.boardCountAll;
        return { searchData, countNum };
      }
    })
    .catch((err) => {
      console.log(err);
      alert("데이터가 존재하지 않습니다");
    });
};

export const getSearchAll = (pageNum, SHOW_ARTICLE_NUM, target, value) => {
  return api
    .get("board/list", {
      params: {
        page: pageNum,
        num: SHOW_ARTICLE_NUM,
        target: target,
        value: value,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        const searchData = res.data.data.searchData;
        const countNum = res.data.data.countNum;
        return { searchData, countNum };
      }
    })
    .catch((err) => {
      console.log(err);
      alert("검색 결과가 없습니다");
    });
};

export const getDetail = (id, pageNum, SHOW_ARTICLE_NUM, target, value, nav) => {
  api
    .get(`board/list/${id}`, { params: { id: id } })
    .then((res) => {
      const article = res.data.data[0];
      nav(`/board/${id}`, {
        state: {
          data: article,
          pageNum: pageNum,
          articleNum: SHOW_ARTICLE_NUM,
          target: target,
          value: value,
        },
      });
      return article;
    })
    .catch((err) => err);
};

export const writeContent = (title, content, writer, nav) => {
  api
    .post("board/write", {
      title: title,
      content: content,
      writer: writer,
    })
    .then((res) => {
      if (res.status === 200) {
        nav("/board");
        return alert("글이 등록되었습니다");
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const handleDelete = (boardId, nav) => {
  api
    .get(`board/delete/${boardId}`, { params: { id: boardId } })
    .then((res) => {
      if (res.status === 200) {
        nav("/board");
        return alert("삭제되었습니다");
      }
    })
    .catch((err) => alert("삭제 실패"));
};

export const handleEdit = (title, content, boardId, writer, nav) => {
  api
    .post("board/edit", {
      title: title,
      content: content,
      board_id: boardId,
      writer: writer,
    })
    .then((res) => {
      if (res.status === 200) {
        nav("/board");
        return alert("수정되었습니다");
      }
    })
    .catch((err) => err);
};
