import { useState, useEffect } from 'react';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(async () => {
    toast.success("Welcome!!!");
    setAccounts( await web3.eth.getAccounts() );
    setTokenName( await contract.methods.name().call() );
    setTokenSymbol( await contract.methods.symbol().call() );
  }, []);

  const handleBalanceOf = async (event) => {
    event.preventDefault();

    toast("Finding Balance...");

    const response = await contract.methods.balanceOf(balanceOfAddress).call();
    console.log(response);

    toast.success(`Balance of address ${balanceOfAddress} is ${response}`, {
      style: {fontSize: "0.7rem"}
    });
  }

  const handleMint = async (event) => {
    event.preventDefault();

    toast("Minting in process...");

    const response = await contract.methods.mint(accounts[0], mintTokens)
      .send({from: accounts[0], gas: 1000000});
    console.log(response);

    toast.success("Txn completed");
  }

  const handleTransferTo = async (event) => {
    event.preventDefault();

    toast("Transfer in process...");

    const response = await contract.methods.transfer(transferTo, transferAmount)
      .send({from: accounts[0], gas: 1000000});
    console.log(response);

    toast.success("Txn completed");
  }

  return (
    <div className="App">
      <div className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <h5>Made By: <a href="https://www.linkedin.com/in/netanmangal">Netan Mangal</a></h5>
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

        <p>
          <ToastContainer style={{fontSize: "1rem", width: "30rem"}} position="bottom-right" theme="dark" autoClose={3000} />
        </p>
      </div>
    </div>
  );
}

export default App;
