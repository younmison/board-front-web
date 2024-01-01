import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Borad from "./pages/Borad";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
import Edit from "./pages/Edit";
import FindPassword from "./pages/FindPassword";
import SetPassword from "./pages/SetPassword";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const getKey = localStorage.getItem("persist:root");
  const token = getKey ? JSON.parse(JSON.parse(getKey)?.user)?.token : "";

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/findpassword" element={<FindPassword />} />
      <Route path="/setpw" element={<SetPassword />} />
      <Route path="/board" element={<PrivateRouter isAuth={token} component={<Borad />} />} />
      <Route path="/board/:id" element={<PrivateRouter isAuth={token} component={<Detail />} />} />
      <Route path="/write" element={<PrivateRouter isAuth={token} component={<Write />} />} />
      <Route path="/board/:id/edit" element={<PrivateRouter isAuth={token} component={<Edit />} />} />
    </Routes>
  );
}

export default App;
