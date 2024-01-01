import api from "./index";

// export const userLogin = (userId, userPw, nav) => {
//   api
//     .post("user/login", {
//       id: userId,
//       password: userPw,
//     })
//     .then((res) => {
//       if (res.status === 200) {
//         nav("/board");
//         return alert("로그인 성공");
//       }
//     })
//     .catch((err) => {
//       alert("아이디 또는 비밀번호를 확인하세요");
//     });
// };
export const checkId = (userId) => {
  return api
    .get(`user/checkId/${userId}`)
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
      if (res.response.status === 400) {
        alert("중복된 아이디입니다");
        return false;
      }
    })
    .catch((err) => {
      alert("유효하지 않은 아이디입니다");
      return false;
    });
};

export const checkName = (userName) => {
  return api
    .get(`user/checkname/${userName}`)
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
      if (res.response.status === 400) {
        alert("중복된 닉네임입니다");
        return false;
      }
    })
    .catch((err) => {
      alert("유효하지 않은 닉네임입니다");
      return false;
    });
};

export const userJoin = (id, name, password, question, answer, nav) => {
  api
    .post("user/join", {
      id: id,
      nickname: name,
      password: password,
      question: Number(question),
      answer: answer,
    })
    .then((res) => {
      if (res.status === 200) {
        alert("가입 완료");
        nav("/");
      }
    })
    .catch((err) => {
      alert("가입 실패");
      return false;
    });
};

export const checkAnswer = (id, question, answer, nav) => {
  return api
    .post("user/checkanswer", {
      account: id,
      question: Number(question),
      answer: answer,
    })
    .then((res) => {
      if (res.status === 200) {
        const data = res.data.data;
        nav("/setpw", {
          state: {
            account: data.account,
            token: data.token,
          },
        });
        return data;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const saveNewPassword = (userToken, newPassword, account, nav) => {
  api
    .post("user/newPassword", {
      userToken: userToken,
      password: newPassword,
      account: account,
    })
    .then((res) => {
      if (res.status === 200) {
        nav("/");
        return alert("비밀번호가 변경되었습니다");
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
