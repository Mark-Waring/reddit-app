import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function useHandleRewind() {
  const { readIt, prevProgress, currentAudio, setProgress, progress } =
    useContext(AppContext);

  function handleRewind() {
    window.speechSynthesis.cancel();
    currentAudio.progress = prevProgress.current + progress - 60;
    prevProgress.current = currentAudio.progress;
    const track = readIt(currentAudio)?.slice(
      prevProgress.current,
      readIt(currentAudio).length
    );
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }
  return [handleRewind];
}
