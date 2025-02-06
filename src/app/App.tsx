import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Auth } from "../features/auth/ui/Auth";
import { Chat } from "../features/chat/ui/Chat";
import "./App.scss";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { useEffect } from "react";

function App() {
  const isAuth = useSelector<AppRootStateType>(
    (state) => state.auth.isAuthorized
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/chat", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
