// import { useState } from "react";

// const splitText = (text, from, to) => [
//   text.slice(0, from),
//   text.slice(from, to),
//   text.slice(to),
// ];

// const HighlightedText = ({ text, from, to }) => {
//   const [start, highlight, finish] = splitText(text, from, to);
//   return (
//     <p>
//       {start}
//       <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
//       {finish}
//     </p>
//   );
// };

// export default function NewListenTool({ currentThread }) {
//   function readReplies(thread) {
//     return `${thread?.map((post) => {
//       if (!post || !post.author) {
//         return "";
//       }
//       return `${post.toRead}. ${readReplies(post?.getReplies)}`;
//     })}`;
//   }
//   const threadToRead = `${currentThread?.toRead} ${readReplies(
//     currentThread?.repliesArray
//   )}`;

//   const [disabled, setDisabled] = useState(false);
//   const [highlightSection, setHighlightSection] = useState({
//     from: 0,
//     to: 0,
//   });

//   const handleClick = () => {
//     const synth = window.speechSynthesis;
//     if (!synth) {
//       console.error("no tts");
//       return;
//     }

//     let utterance = new SpeechSynthesisUtterance(threadToRead);
//     utterance.addEventListener("start", () => setDisabled(true));
//     utterance.addEventListener("end", () => setDisabled(false));
//     utterance.addEventListener("boundary", ({ charIndex, charLength }) => {
//       setHighlightSection({ from: charIndex, to: charIndex + charLength });
//     });
//     synth.speak(utterance);
//   };

//   return (
//     <div className="App">
//       <HighlightedText text={threadToRead} {...highlightSection} />
//       <button disabled={disabled} onClick={handleClick}>
//         klik me
//       </button>
//     </div>
//   );
// }
