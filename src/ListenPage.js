import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import ListenTool from "./ListenTool";
import Thread from "./Thread";

export default function ListenPage() {
  const { savedThreads } = useContext(AppContext);
  const [currentThread, setCurrentThread] = useState(null);
  const { threadId } = useParams();

  useEffect(() => {
    setCurrentThread(
      savedThreads.find((thread) => {
        return thread.id === threadId;
      })
    );
    // eslint-disable-next-line
  }, [threadId]);

  return (
    <>
      <ListenTool currentThread={currentThread} />
      <Thread currentThread={currentThread} />
    </>
  );
}

// import { PollyClient, StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";

// const client = new PollyClient(config);
// const command = new StartSpeechSynthesisTaskCommand(input);
// const response = await client.send(command);

// var params = {
//     OutputFormat: "mp3",
//     OutputS3BucketName: "videoanalyzerbucket",
//     Text: "Hello David, How are you?",
//     TextType: "text",
//     VoiceId: "Joanna",
//     SampleRate: "22050",
//   };

//   const run = async () => {
//     try {
//       await client.send(new StartSpeechSynthesisTaskCommand(params));
//       console.log("Success, audio file added to " + params.OutputS3BucketName);
//     } catch (err) {
//       console.log("Error putting object", err);
//     }
//   };
//   run();

// // import { PollyClient, DeleteLexiconCommand } from "@aws-sdk/client-polly";

// // export default function ListenPage(audioToUse) {
// //     const client = new PollyClient({ region: "us-east-2" });

// // const params = {
// //   /** input parameters */
// // };
// // const command = new DeleteLexiconCommand(params);

// // try {
// //     const data = await client.send(command);
// //     // process data.
// //   } catch (error) {
// //     // error handling.
// //   } finally {
// //     // finally.
// //   }

//     ////////
// //////////
// AWS.config.region = us-east-2;

// const polly = new AWS.Polly();

// const params = {
//     OutputFormat: "mp3",
//     Text: "Hello Mark, how are you today?",
//     TextType: "text",
//     VoiceId: "Joanna"
// }

// polly.synthesizeSpeech(params, function(err, data) {
//     if(err) {
//         console.log(err, err.stack);
//     }
//     else {
//         const uIntBArray = new UintBArray(data.AudioStream);
//         const arrayBuffer = uIntBArray.buffer;
//         const blob = new Blob([arrayBuffer]);
//         const audio = audioToUse
//         const url = URL.createObjectURL(blob);
//         audio[0].src = url;
//         audio[0].play()

//     }
// })
//   return;
// }
