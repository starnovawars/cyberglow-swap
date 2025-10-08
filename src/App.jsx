import React, { useState } from "react";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Instala MetaMask para conectarte.");
    }
  };

  return (
    <div className="min-h-screen bg-cyberdark text-cyberlight flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-cyberblue drop-shadow-glow">
        🚀 Cyberglow Swap
      </h1>

      {!connected ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-cyberblue text-white rounded-2xl shadow-glow hover:opacity-90"
        >
          Conectar Wallet
        </button>
      ) : (
        <div className="text-center">
          <p className="text-cyberlight mb-2">Conectado como:</p>
          <p className="text-cyberblue font-semibold">{account}</p>
        </div>
      )}

      <footer className="mt-10 text-sm text-gray-400">
        <p>Cyberglow DEX — powered by IOTA EVM</p>
      </footer>
    </div>
  );
}
