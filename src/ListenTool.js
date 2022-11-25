export default function ListenTool({ currentThread }) {
  const msg = new SpeechSynthesisUtterance();
  const threadToRead = `${currentThread?.toRead} ${readReplies(
    currentThread?.repliesArray
  )}`;

  const speechHandler = (msg) => {
    msg.text = threadToRead;
    window.speechSynthesis.speak(msg);
  };

  const speechStopper = () => {
    window.speechSynthesis.cancel();
  };

  function readReplies(thread) {
    return `${thread?.map((post) => {
      if (!post || !post.author) {
        return "";
      }
      return `${post.toRead}. ${readReplies(post?.getReplies)}`;
    })}`;
  }

  return (
    <>
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
      <button onClick={() => speechStopper()}>STOP</button>
    </>
  );
}
