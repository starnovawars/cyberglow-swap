import React from "react";

export default function App() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 20% 20%, #0A0F1F, #010613)",
        fontFamily: "Poppins, sans-serif",
        color: "#00D8FF",
        textAlign: "center",
      }}
    >
      {/* Fondo animado */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle at center, rgba(0, 216, 255, 0.15), transparent 70%)",
          animation: "glowMove 8s ease-in-out infinite alternate",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <img
          src="/cyberglow-logo.png"
          alt="Cyberglow Logo"
          width="160"
          style={{
            filter: "drop-shadow(0 0 15px #00D8FF)",
            marginBottom: "20px",
            animation: "pulse 4s infinite ease-in-out",
          }}
        />
        <img
          src="/cyberglow-title.png"
          alt="Cyberglow Title"
          width="320"
          style={{
            filter: "drop-shadow(0 0 10px #00D8FF)",
            marginBottom: "16px",
          }}
        />
        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.9,
            textShadow: "0 0 10px #00D8FF",
          }}
        >
          ⚡ DEX descentralizado en IOTA EVM ⚡
        </p>
      </div>

      {/* Animaciones */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px #00D8FF); }
            50% { transform: scale(1.05); filter: drop-shadow(0 0 22px #00D8FF); }
          }

          @keyframes glowMove {
            0% { transform: translate(-10%, -10%) scale(1); }
            100% { transform: translate(10%, 10%) scale(1.2); }
          }
        `}
      </style>
    </div>
  );
}
