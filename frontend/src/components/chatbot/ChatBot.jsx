import { useState } from "react";
import ChatPanel from "./ChatPanel";
import ChatToggleButton from "./ChatToggleButton";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatToggleButton open={open} setOpen={setOpen} />
      <ChatPanel open={open} setOpen={setOpen} />
    </>
  );
}