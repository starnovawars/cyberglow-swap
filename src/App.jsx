import React from 'react'

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(180deg, #0A0F1F 0%, #091930 100%)',
        color: '#00D8FF',
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'center',
      }}
    >
      <img
        src="/cyberglow-logo.png"
        alt="Cyberglow Logo"
        width="160"
        style={{
          filter: 'drop-shadow(0 0 12px #00D8FF)',
          marginBottom: '24px',
        }}
      />
      <h1
        style={{
          fontSize: '2.5rem',
          marginBottom: '12px',
          textShadow: '0 0 10px #00D8FF',
        }}
      >
        Cyberglow Swap
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          opacity: 0.9,
        }}
      >
        ⚡ DEX descentralizado en IOTA EVM ⚡
      </p>
    </div>
  )
}
