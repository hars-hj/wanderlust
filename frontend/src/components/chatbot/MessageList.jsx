import MessageBubble from "./MessageBubble";

export default function MessageList({messages}) {
 

  return (
    <div
      style={{
        flex: 1,
        padding: "16px",
        overflowY: "auto",
        background: "#f9fafb",
      }}
    >
      {messages.map((msg, index) => (
        <MessageBubble key={index} role={msg.role} text={msg.text} />
      ))}
    </div>
  );
}