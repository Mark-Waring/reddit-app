import { useContext } from "react";
import { AppContext } from "./AppContext";
import "./index.css";
import ThreadSelection from "./ThreadSelection";
import SavedThreads from "./SavedThreads";

function App() {
  const { searchUrl } = useContext(AppContext);
  return (
    <>
      <h1>Reddit App</h1>
      <ThreadSelection />
    </>
  );
}

export default App;
