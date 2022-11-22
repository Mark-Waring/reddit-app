import "./index.css";
import ThreadAdd from "./ThreadAdd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListenPage from "./ListenPage";

function App() {
  return (
    <Router>
      <h1>Reddit App</h1>
      <Routes>
        <Route exact path="/" element={<ThreadAdd />} />
        <Route path=":threadId" element={<ListenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
