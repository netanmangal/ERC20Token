import { useState, useEffect } from 'react';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import logo from './logo.png';
import './App.css';
import web3 from "./web3.js";
import contract from "./contract.js";
import Body from './components/body';

function App() {
  let [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  let [tokenName, setTokenName] = useState();
  let [tokenSymbol, setTokenSymbol] = useState();
  let [accounts, setAccounts] = useState([]);
  let [balanceOfAddress, setBalanceOfAddress] = useState();
  let [mintTokens, setMintTokens] = useState();
  let [transferTo, setTransferTo] = useState();
  let [transferAmount, setTransferAmount] = useState();

  useEffect(() => {
    toast.success("Welcome!!!");

    const init = async () => {
      setAccounts( await web3.eth.getAccounts() );
      setTokenName( await contract.methods.name().call() );
      setTokenSymbol( await contract.methods.symbol().call() );
    }

    const checkMetamask = async () => {
      if (typeof web3 !== 'undefined') {
        if (web3?.currentProvider?.isMetaMask === true) {
          setIsMetamaskInstalled(true);
          init();
          if (accounts.length == 0) {
            await window.ethereum.enable();
          }
        } else {
          toast.error("Kindly install metamask!!!");
        }
      } else {
        toast.error("Kindly install metamask!!!");
      }
    }

    checkMetamask();
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

    toast("Minting in process...", {
      autoClose: 12000
    });

    const response = await contract.methods.mint(accounts[0], mintTokens)
      .send({from: accounts[0], gas: 1000000});
    console.log(response);

    toast.success("Txn completed");
  }

  const handleTransferTo = async (event) => {
    event.preventDefault();

    toast("Transfer in process...", {
      autoClose: 12000
    });

    const response = await contract.methods.transfer(transferTo, transferAmount)
      .send({from: accounts[0], gas: 1000000});
    console.log(response);

    toast.success("Txn completed");
  }

  return (
    <div className="App">
      <div className="App-body">
        <img style={{marginTop: "50px"}} src={logo} className="App-logo" alt="logo" />
        <h5>Made By: <a href="https://www.linkedin.com/in/netanmangal" target="_blank" rel="noreferrer noopener">Netan Mangal</a></h5>
        <Body isMetamaskInstalled={isMetamaskInstalled} accounts={accounts} contract={contract} tokenName={tokenName} tokenSymbol={tokenSymbol} handleMint={handleMint} setMintTokens={setMintTokens} handleBalanceOf={handleBalanceOf} setBalanceOfAddress={setBalanceOfAddress} handleTransferTo={handleTransferTo} setTransferTo={setTransferTo} setTransferAmount={setTransferAmount} ToastContainer={ToastContainer} />

        <ToastContainer style={{fontSize: "1rem", width: "30rem"}} position="top-right" theme="dark" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
