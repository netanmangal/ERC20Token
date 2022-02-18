import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import web3 from "./web3.js";
import contract from "./contract.js";

function App() {
  let [tokenName, setTokenName] = useState();
  let [tokenSymbol, setTokenSymbol] = useState();
  let [accounts, setAccounts] = useState([]);
  let [balanceOfAddress, setBalanceOfAddress] = useState();
  let [mintTokens, setMintTokens] = useState();
  let [transferTo, setTransferTo] = useState();
  let [transferAmount, setTransferAmount] = useState();
  let [message, setMessage] = useState();

  useEffect(async () => {
    setMessage("Welcome");
    setAccounts( await web3.eth.getAccounts() );
    setTokenName( await contract.methods.name().call() );
    setTokenSymbol( await contract.methods.symbol().call() );

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, []);

  const handleBalanceOf = async (event) => {
    event.preventDefault();

    setMessage("Finding Balance...");

    const response = await contract.methods.balanceOf(balanceOfAddress).call();
    console.log(response);

    setMessage(`Balance of address ${balanceOfAddress} is ${response}`);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  const handleMint = async (event) => {
    event.preventDefault();

    setMessage("Minting in process...");

    const response = await contract.methods.mint(accounts[0], mintTokens)
      .send({from: accounts[0], gas: 1000000});
    console.log(response);

    setMessage("Txn completed");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  const handleTransferTo = async (event) => {
    event.preventDefault();

    setMessage("Transfer in process...");

    const response = await contract.methods.transfer(transferTo, transferAmount)
      .send({from: accounts[0], gas: 1000000});
    console.log(response);

    setMessage("Txn completed");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are connected via address: <b>{accounts[0]}</b></p>
        <p>Contract address: <b>{contract.options.address}</b></p>

        <hr></hr>

        <h2>ERC-20 Token Details</h2>
        <p>Name: {tokenName}</p>
        <p>Symbol: {tokenSymbol}</p>

        <hr></hr>

        <h2>Mint tokens</h2>
        <form onSubmit={handleMint}>
          <input placeholder="How many tokens to mint?" type="text" onChange={(event) => {setMintTokens(event.target.value)}} /> <br />
          <button type='Submit'>Mint</button>
        </form>

        <hr></hr>

        <h2>Balance Of</h2>
        <form onSubmit={handleBalanceOf}>
          <input placeholder="Balance of Address" type="text" onChange={(event) => {setBalanceOfAddress(event.target.value)}} /> <br />
          <button type="submit">Get me Balance</button>
        </form>

        <hr></hr>

        <h2>Transfer To Utility</h2>
        <form onSubmit={handleTransferTo}>
          <input placeholder="TransferToAddress" type="text" onChange={(event) => {setTransferTo(event.target.value)}} /> <br />
          <input placeholder="Amount (in ether)" type="text" onChange={(event) => {setTransferAmount(event.target.value)}} /> <br />
          <button type='Submit'>Transfer</button>
        </form>

        <p className="Msg">{message}</p>
        <p>Made By: <a href="https://www.linkedin.com/in/netanmangal">Netan Mangal</a></p>
      </header>
    </div>
  );
}

export default App;
