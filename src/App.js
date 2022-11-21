import "./index.css";
import ThreadSelection from "./ThreadSelection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./Posts";

function App() {
  return (
    <Router>
      <h1>Reddit App</h1>
      <Routes>
        <Route path="/" element={<ThreadSelection />}>
          <Route path=":threadId" element={<Posts />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
