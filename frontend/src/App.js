import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import web3 from "./web3.js";
import contract from "./contract.js";

function App() {
  let [tokenName, setTokenName] = useState();
  let [tokenSymbol, setTokenSymbol] = useState();
  let [accounts, setAccounts] = useState([]);

  useEffect(async () => {
    setAccounts( await web3.eth.getAccounts() );
    setTokenName( await contract.methods.name().call() );
    setTokenSymbol( await contract.methods.symbol().call() );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are connected via address: <b>{accounts[0]}</b></p>
        <h2>ERC-20 Token Details:</h2>
        <p>Name: {tokenName}</p>
        <p>Symbol: {tokenSymbol}</p>
      </header>
    </div>
  );
}

export default App;
