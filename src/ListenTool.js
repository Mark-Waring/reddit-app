import { useEffect, useState, useRef } from "react";

export default function ListenTool({ currentThread }) {
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevProgress = useRef(currentThread?.progress ?? 0);

  function readReplies(thread) {
    return `${thread?.map((post) => {
      if (!post || !post.author) {
        return "";
      }
      return `${post.toRead}. ${readReplies(post?.getReplies)}`;
    })}`;
  }

  const readIt = `${currentThread?.toRead} ${readReplies(
    currentThread?.repliesArray
  )}`;

  // useEffect(() => {
  //   if (!currentThread) return;
  //   currentThread.progress = prevProgress.current + progress;
  //   // eslint-disable-next-line
  // }, [progress]);

  const speechHandler = () => {
    const track = readIt?.slice(prevProgress.current, readIt.length);
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  };

  function handlePause() {
    window.speechSynthesis.cancel();
    currentThread.progress = prevProgress.current + progress;
    prevProgress.current = currentThread.progress;
  }

  console.log(`locked in at ${prevProgress.current}`);
  console.log(currentThread?.progress);

  function handleRewind() {
    window.speechSynthesis.cancel();
    currentThread.progress = prevProgress.current + progress - 60;
    prevProgress.current = currentThread.progress;
    const track = readIt?.slice(prevProgress.current, readIt.length);
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
    // speechHandler();
  }

  function handleForward() {
    window.speechSynthesis.cancel();
    currentThread.progress = prevProgress.current + progress + 60;
    prevProgress.current = currentThread.progress;
    const track = readIt?.slice(prevProgress.current, readIt.length);
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }

  return (
    <>
      <button disabled={disabled} onClick={() => speechHandler()}>
        SPEAK
      </button>
      <button onClick={() => handlePause()}>Pause</button>
      <button onClick={() => handleRewind()}>{`<<`}</button>
      <button onClick={() => handleForward()}>{`>>`}</button>
    </>
  );
}
