import api from "./index";

export const getComment = (id) => {
  return api
    .get(`comment/${id}`, { params: { id: id } })
    .then((res) => {
      if (res.status === 200) {
        const comment = res.data.data;
        return comment;
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const writeContent = (id, content, nickname) => {
  api
    .post("comment/write", {
      board_id: id,
      comment_content: content,
      nickname: nickname,
    })
    .then((res) => {
      if (res.status === 200) {
        return window.location.reload();
      }
    })
    .catch((err) => {
      return false;
    });
};

export const handleDelete = (id) => {
  api
    .get(`comment/delete/${id}`, { params: { id: id } })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
        return alert("삭제되었습니다");
      }
    })
    .catch((err) => alert("삭제 실패"));
};

export const handleEdit = (contentData, id, nickname) => {
  api
    .post("comment/edit", {
      comment_content: contentData,
      comment_id: id,
      nickname: nickname,
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
        return alert("수정되었습니다");
      }
    })
    .catch((err) => err);
};
