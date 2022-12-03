import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function useHandleFwd() {
  const { readIt, prevProgress, currentAudio, setProgress, progress } =
    useContext(AppContext);

  function handleFwd() {
    window.speechSynthesis.cancel();
    currentAudio.progress = prevProgress.current + progress + 60;
    prevProgress.current = currentAudio.progress;
    const track = readIt(currentAudio)?.slice(prevProgress.current);
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }
  return [handleFwd];
}
