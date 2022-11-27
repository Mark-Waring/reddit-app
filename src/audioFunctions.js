// import { useContext } from "react";
// import { AppContext } from "./AppContext";

// const { setAudioIsPlaying, setIsPaused } = useContext(AppContext);

// export function handleSpeak(text) {
//   const track = text?.slice(prevProgress.current, readIt.length);
//   const utterance = new SpeechSynthesisUtterance(track);
//   const synth = window.speechSynthesis;
//   setAudioIsPlaying(true);
//   setIsPaused(false);

//   if (!synth) {
//     console.error("no tts");
//     return;
//   }
//   utterance.addEventListener("start", () => setDisabled(true));
//   utterance.addEventListener("end", () => setDisabled(false));
//   utterance.addEventListener("boundary", ({ charIndex }) => {
//     setProgress(charIndex);
//   });
//   synth.speak(utterance);
// }

// export function handlePause(thread) {
//   setIsPaused(true);
//   window.speechSynthesis.cancel();
//   thread.progress = prevProgress.current + progress;
//   prevProgress.current = currentThread.progress;
// }

// export function handleRewind(thread, text) {
//   window.speechSynthesis.cancel();
//   thread.progress = prevProgress.current + progress - 60;
//   prevProgress.current = currentThread.progress;
//   const track = text?.slice(prevProgress.current, readIt.length);
//   const utterance = new SpeechSynthesisUtterance(track);
//   const synth = window.speechSynthesis;
//   if (!synth) {
//     console.error("no tts");
//     return;
//   }
//   utterance.addEventListener("start", () => setDisabled(true));
//   utterance.addEventListener("end", () => setDisabled(false));
//   utterance.addEventListener("boundary", ({ charIndex }) => {
//     setProgress(charIndex);
//   });
//   synth.speak(utterance);
// }

// export function handleForward(thread, text) {
//   window.speechSynthesis.cancel();
//   thread.progress = prevProgress.current + progress + 60;
//   prevProgress.current = currentThread.progress;
//   const track = text?.slice(prevProgress.current, readIt.length);
//   const utterance = new SpeechSynthesisUtterance(track);
//   const synth = window.speechSynthesis;
//   if (!synth) {
//     console.error("no tts");
//     return;
//   }
//   utterance.addEventListener("start", () => setDisabled(true));
//   utterance.addEventListener("end", () => setDisabled(false));
//   utterance.addEventListener("boundary", ({ charIndex }) => {
//     setProgress(charIndex);
//   });
//   synth.speak(utterance);
// }
