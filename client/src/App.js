import Singlepost from "./components/singlePost/SinglePost";
import TopBar from "./components/topbar/TopBar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Settings from "./Pages/settings/Settings";
import Write from "./Pages/write/Write";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Singlepost />} />
      </Routes>
    </Router>
  );
}

export default App;
