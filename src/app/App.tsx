import "./App.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store"; // Импорт кастомного хука

function App() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="App">
      <div className="App">
        <button>Отправить сообщение</button>
      </div>
    </div>
  );
}

export default App;
