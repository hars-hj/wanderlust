export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "10px 14px",
          borderRadius: "14px",
          background: isUser ? "#1f2937" : "white",
          color: isUser ? "white" : "#111827",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          fontSize: "14px",
        }}
      >
        {text}
      </div>
    </div>
  );
}