import "./index.css";
import ThreadAdd from "./ThreadAdd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListenPage from "./ListenPage";
import GlobalAudio from "./GlobalAudio";

function App() {
  return (
    <Router>
      <div className="route-wrapper">
        <h1>Read It</h1>
        <Routes>
          <Route exact path="/" element={<ThreadAdd />} />
          <Route path=":threadId" element={<ListenPage />} />
        </Routes>
        <GlobalAudio />
      </div>
    </Router>
  );
}

export default App;
