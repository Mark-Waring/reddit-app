import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function useHandlePause() {
  const { prevProgress, currentAudio, setIsPaused } = useContext(AppContext);
  function handlePause() {
    setIsPaused(true);
    window.speechSynthesis.cancel();
    prevProgress.current = currentAudio.progress;
  }
  return [handlePause];
}
