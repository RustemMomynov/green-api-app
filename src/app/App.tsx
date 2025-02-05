import { Route, Routes } from "react-router-dom";
import { Auth } from "../features/auth/ui/Auth";
import { Chat } from "../features/chat/ui/Chat";
import "./App.css";

function App() {
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
