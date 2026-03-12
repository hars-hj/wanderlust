import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useState } from "react";


export default function ChatPanel({ open, setOpen }) {

      const [messages, setMessages] = useState([]);

  return (
    <div
      style={{
        position: "fixed",
        right: open ? "20px" : "-420px",
        bottom: "90px",
        width: "380px",
        height: "620px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        transition: "right 0.3s ease",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 999,
      }}
    >
      <ChatHeader setOpen={setOpen} />
       <MessageList messages={messages} />

       <ChatInput setMessages={setMessages} />

    </div>
  );
}