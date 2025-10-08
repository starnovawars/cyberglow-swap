import React, { useState } from "react";
import "./styles/globals.css";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [fromToken, setFromToken] = useState("IOTA");
  const [toToken, setToToken] = useState("SMR");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  // === Conectar MetaMask ===
  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletConnected(true);
        setStatus("✅ Wallet conectada");
      } catch (error) {
        setStatus("❌ Error al conectar la wallet");
      }
    } else {
      setStatus("⚠️ MetaMask no detectada");
    }
  }

  // === Simular Swap ===
  async function swapTokens() {
    if (!walletConnected) {
      setStatus("⚠️ Conecta tu wallet primero");
      return;
    }
    if (!amount) {
      setStatus("⚠️ Ingresa una cantidad");
      return;
    }

    // Simulación: cambiar tokens
    setStatus("⏳ Ejecutando swap...");
    setTimeout(() => {
      setStatus(`✅ Swap completado: ${amount} ${fromToken} → ${toToken}`);
      setAmount("");
    }, 2000);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <img
        src="/cyberglow-logo.png"
        alt="Cyberglow Logo"
        className="w-32 mb-6"
      />
      <h1 className="text-4xl font-bold mb-8 text-cyan-400 drop-shadow-lg">
        Cyberglow Swap ⚡
      </h1>

      {!walletConnected ? (
        <button
          onClick={connectWallet}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg mb-4"
        >
          Conectar Wallet
        </button>
      ) : (
        <p className="mb-4 text-green-400">Wallet conectada ✅</p>
      )}

      <div className="bg-[#0a1325]/70 p-6 rounded-2xl shadow-xl backdrop-blur-lg w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-sm text-cyan-300 mb-1">De</label>
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="w-full p-2 rounded-md bg-[#08111e] border border-cyan-700 text-white"
          >
            <option>IOTA</option>
            <option>SMR</option>
            <option>USDT</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-cyan-300 mb-1">A</label>
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="w-full p-2 rounded-md bg-[#08111e] border border-cyan-700 text-white"
          >
            <option>SMR</option>
            <option>IOTA</option>
            <option>USDT</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-cyan-300 mb-1">Cantidad</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full p-2 rounded-md bg-[#08111e] border border-cyan-700 text-white"
          />
        </div>

        <button
          onClick={swapTokens}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          Swap
        </button>

        {status && (
          <p className="mt-4 text-sm text-cyan-300 animate-pulse">{status}</p>
        )}
      </div>

      <footer className="mt-8 text-xs text-cyan-700">
        Cyberglow Swap © 2025 — IOTA EVM Integration
      </footer>
    </div>
  );
}

export default App;
