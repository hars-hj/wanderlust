import { useState } from "react";
import axios from 'axios';

export default function ChatInput({setMessages}) {
  const [message, setMessage] = useState("");
  

  const sendMessage = async() => {
    if (!message.trim()) return;
    const userMessage = {
      role: "user",
      text: message
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    try{
        const res = await axios.post('/api/chat',
        {
            message:message
        }
        )
        const data = res.data.data;

        const botMessage = {
        role: "bot",
        text:data
      };
     
      setMessages(prev => [...prev, botMessage]);

    }catch(err){
        console.error("error in chat frontend",err);
    }
   
   
  };

  return (
    <div
      style={{
        padding: "12px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        gap: "8px",
      }}
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about listings..."
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          outline: "none",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          background: "#1f2937",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}