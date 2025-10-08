import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getWallets } from "@iota/wallet-standard";
import { DEFAULT_RPC, ROUTER_ADDRESS, ROUTER_ABI } from "../constants";


// ABI parcial para token ERC20 (balanceOf, decimals)
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [tokenAddress, setTokenAddress] = useState(""); // dirección del token ERC20 que quieras verificar
  const [status, setStatus] = useState("");

  // Conectar MetaMask
  async function connectMetaMask() {
    if (!window.ethereum) {
      setStatus("MetaMask no detectada");
      return;
    }
    try {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await ethProvider.send("eth_requestAccounts", []);
      const ethSigner = ethProvider.getSigner();
      const addr = await ethSigner.getAddress();
      setProvider(ethProvider);
      setSigner(ethSigner);
      setAccount(addr);
      setStatus("MetaMask conectada: " + addr);
    } catch (e) {
      console.error(e);
      setStatus("Error MetaMask: " + (e.message || e));
    }
  }

  // Conectar IOTA Wallet
  async function connectIotaWallet() {
    try {
      const wallets = await getWallets().get();
      if (!wallets || wallets.length === 0) {
        setStatus("No se encontró IOTA Wallet");
        return;
      }
      const wallet = wallets[0];
      if (wallet.features && wallet.features["standard:connect"]) {
        await wallet.features["standard:connect"].connect();
      }
      // Obtener cuentas
      const accounts = wallet.accounts || (wallet.getAccounts && await wallet.getAccounts());
      if (!accounts || accounts.length === 0) {
        setStatus("Wallet IOTA no devolvió cuentas");
        return;
      }
      const acc = accounts[0];
      setStatus("IOTA Wallet conectada: " + (acc.address || acc.id || ""));

      // Si la wallet puede exponer provider EVM:
      if (wallet.getProvider) {
        const evmChain = acc.chains && acc.chains.find(c => String(c).toLowerCase().includes("evm"));
        if (evmChain) {
          const raw = await wallet.getProvider({ chain: evmChain });
          const ethProvider = new ethers.providers.Web3Provider(raw, "any");
          const ethSigner = ethProvider.getSigner();
          const addr = await ethSigner.getAddress();
          setProvider(ethProvider);
          setSigner(ethSigner);
          setAccount(addr);
          setStatus(s => s + " (provider EVM activo)");
        }
      }
    } catch (e) {
      console.error(e);
      setStatus("Error IOTA Wallet: " + (e.message || e));
    }
  }

  // Obtener balance ERC20 del tokenAddress
  async function fetchTokenBalance() {
    try {
      if (!provider || !account) return;
      if (!tokenAddress) {
        setBalance("");
        return;
      }
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const rawBal = await token.balanceOf(account);
      const decimals = await token.decimals();
      const formatted = ethers.utils.formatUnits(rawBal, decimals);
      setBalance(formatted);
    } catch (e) {
      console.error(e);
      setStatus("Error al obtener balance: " + (e.message || e));
    }
  }

  // Cada vez que cambien provider/account/token, recargar balance
  useEffect(() => {
    fetchTokenBalance();
  }, [provider, account, tokenAddress]);

  return (
    <div className="min-h-screen p-6 bg-cyberdark text-cyberlight flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Cyberglow Swap</h1>

      <div className="flex gap-4 mb-4">
        <button onClick={connectMetaMask} className="bg-cyberblue px-4 py-2 rounded">MetaMask</button>
        <button onClick={connectIotaWallet} className="bg-cyberaccent px-4 py-2 rounded">IOTA Wallet</button>
      </div>

      {account && (
        <div className="mb-4">
          <p>Cuenta conectada:</p>
          <p className="font-mono">{account}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-1">Token ERC20 (dirección)</label>
        <input
          type="text"
          value={tokenAddress}
          onChange={e => setTokenAddress(e.target.value)}
          placeholder="0x..."
          className="p-2 w-full max-w-md rounded bg-[#08111e] text-white"
        />
      </div>

      {balance !== "" && (
        <div className="mb-6">
          <p>Balance: <span className="font-semibold">{balance}</span></p>
        </div>
      )}

      <p className="text-sm text-cyan-300">{status}</p>
    </div>
  );
}

export default App;
