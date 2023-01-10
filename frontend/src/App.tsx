import React, {useEffect, useState } from 'react';
import { Wallet } from "fuels";
import './App.css';
import { CounterContractAbi__factory } from './contracts';

const CONTRACT_ID = "0x3edb96c23766b8504caaff042994efa18460e7ba27f60191394a6bcf5be8d7d8";
const WALLET_SECRET = "0x59a81dc8fd723d4246ba48740989905e31206bce4835d92e4689562c542af5c3";

const wallet = Wallet.fromPrivateKey(
  WALLET_SECRET,
  "https://node-beta-2.fuel.network/graphql"
);

const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function main() {
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    }
    main();
  }, []);
  async function increment() {
    setLoading(true);
    try {
      await contract.functions.increment().txParams({ gasPrice: 1}).call();
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Counter: {counter}</p>
        <button disabled={loading} onClick={increment}>
          {loading ? "Incrementing..." : "Increment"}
        </button>
      </header>
    </div>
  );
}

export default App;
