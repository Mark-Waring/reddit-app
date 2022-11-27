// import { useContext, useState } from "react";
// import { AppContext } from "./AppContext";

// export default function useHandleSpeak() {
//   const {
//     readIt,
//     prevProgress,
//     currentAudio,
//     setAudioIsPlaying,
//     setProgress,
//     setIsPaused,
//   } = useContext(AppContext);
//   const [disabled, setDisabled] = useState(false);
//   const track = readIt(currentAudio)?.slice(
//     prevProgress.current,
//     readIt(currentAudio).length
//   );
//   const utterance = new SpeechSynthesisUtterance(track);
//   const synth = window.speechSynthesis;
//   setAudioIsPlaying(true);
//   setIsPaused(false);
//   utterance.addEventListener("start", () => setDisabled(true));
//   utterance.addEventListener("end", () => setDisabled(false));
//   utterance.addEventListener("boundary", ({ charIndex }) => {
//     setProgress(charIndex);
//   });
//   synth.speak(utterance);
// }

// // export function handleSpeak(text) {
// //   const track = text?.slice(prevProgress.current, readIt.length);
// //   const utterance = new SpeechSynthesisUtterance(track);
// //   const synth = window.speechSynthesis;
// //   setAudioIsPlaying(true);
// //   setIsPaused(false);

// //   if (!synth) {
// //     console.error("no tts");
// //     return;
// //   }
// //   utterance.addEventListener("start", () => setDisabled(true));
// //   utterance.addEventListener("end", () => setDisabled(false));
// //   utterance.addEventListener("boundary", ({ charIndex }) => {
// //     setProgress(charIndex);
// //   });
// //   synth.speak(utterance);
// // }

// // export function handlePause(thread) {
// //   setIsPaused(true);
// //   window.speechSynthesis.cancel();
// //   thread.progress = prevProgress.current + progress;
// //   prevProgress.current = currentThread.progress;
// // }

// // export function handleRewind(thread, text) {
// //   window.speechSynthesis.cancel();
// //   thread.progress = prevProgress.current + progress - 60;
// //   prevProgress.current = currentThread.progress;
// //   const track = text?.slice(prevProgress.current, readIt.length);
// //   const utterance = new SpeechSynthesisUtterance(track);
// //   const synth = window.speechSynthesis;
// //   if (!synth) {
// //     console.error("no tts");
// //     return;
// //   }
// //   utterance.addEventListener("start", () => setDisabled(true));
// //   utterance.addEventListener("end", () => setDisabled(false));
// //   utterance.addEventListener("boundary", ({ charIndex }) => {
// //     setProgress(charIndex);
// //   });
// //   synth.speak(utterance);
// // }

// // export function handleForward(thread, text) {
// //   window.speechSynthesis.cancel();
// //   thread.progress = prevProgress.current + progress + 60;
// //   prevProgress.current = currentThread.progress;
// //   const track = text?.slice(prevProgress.current, readIt.length);
// //   const utterance = new SpeechSynthesisUtterance(track);
// //   const synth = window.speechSynthesis;
// //   if (!synth) {
// //     console.error("no tts");
// //     return;
// //   }
// //   utterance.addEventListener("start", () => setDisabled(true));
// //   utterance.addEventListener("end", () => setDisabled(false));
// //   utterance.addEventListener("boundary", ({ charIndex }) => {
// //     setProgress(charIndex);
// //   });
// //   synth.speak(utterance);
// // }
