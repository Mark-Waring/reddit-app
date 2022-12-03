import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function useHandleRewind() {
  const { readIt, prevProgress, currentAudio, setProgress, progress } =
    useContext(AppContext);

  function handleRewind() {
    window.speechSynthesis.cancel();
    if (currentAudio.progress >= 60) {
      currentAudio.progress = 0;
      prevProgress.current = 0;
    }
    if (currentAudio.progress > 60) {
      currentAudio.progress = prevProgress.current + progress - 60;
      prevProgress.current = currentAudio.progress;
    }
    const track = readIt(currentAudio)?.slice(prevProgress.current);
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }
  return [handleRewind];
}
