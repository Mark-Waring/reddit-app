import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function useHandleSpeak() {
  const {
    readIt,
    prevProgress,
    currentAudio,
    setAudioIsPlaying,
    setProgress,
    setIsPaused,
  } = useContext(AppContext);

  function handleSpeak() {
    window.speechSynthesis.cancel();
    prevProgress.current = currentAudio.progress;
    const track = readIt(currentAudio)?.slice(
      prevProgress.current,
      readIt(currentAudio).length
    );
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    setAudioIsPlaying(true);
    setIsPaused(false);
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }
  return [handleSpeak];
}
