export default function ChatHeader({ setOpen }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: "#1f2937",
        color: "white",
        fontWeight: "600",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      WonderLust Assistant

      <button
        onClick={() => setOpen(false)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  );
}