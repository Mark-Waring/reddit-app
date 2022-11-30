import { render } from "@testing-library/react";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import GlobalAudioPlayer from "./GlobalAudioPlayer";
const { currentAudio } = useContext(AppContext);

it("should render when current audio is playing"),
  () => {
    if (currentAudio) {
      render(<GlobalAudioPlayer />);
    }
  };
