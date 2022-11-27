import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import GlobalAudio from "./GlobalAudio";

import Thread from "./Thread";

export default function ListenPage() {
  return (
    <>
      {/* <GlobalAudio thread={currentThread} /> */}
      <Thread currentThread={currentThread} />
    </>
  );
}
