export default function ChatToggleButton({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#1f2937",
        color: "white",
        border: "none",
        fontSize: "22px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 999,
      }}
    >
      💬
    </button>
  );
}