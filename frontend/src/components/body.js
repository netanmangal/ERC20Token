function Body ({isMetamaskInstalled, accounts, contract, tokenName, tokenSymbol, handleMint, setMintTokens, handleBalanceOf, setBalanceOfAddress, handleTransferTo, setTransferTo, setTransferAmount}) {
    if (isMetamaskInstalled) {
        return (
            <div>
                <p>You are connected via address: <b>{accounts[0]}</b></p>
                <p>Contract address: <b>{contract.options.address}</b></p>
    
                <br />
    
                <h2>ERC-20 Token Details</h2>
                <p>Name: {tokenName}</p>
                <p>Symbol: {tokenSymbol}</p>
    
                <br />
                <br />
    
                <h2>Mint tokens</h2>
                <form onSubmit={handleMint}>
                <input placeholder="How many tokens to mint?" type="text" onChange={(event) => {setMintTokens(event.target.value)}} /> <br />
                <button type='Submit'>Mint</button>
                </form>
    
                <br />
                <br />
    
                <h2>Balance Of</h2>
                <form onSubmit={handleBalanceOf}>
                <input placeholder="Balance of Address" type="text" onChange={(event) => {setBalanceOfAddress(event.target.value)}} /> <br />
                <button type="submit">Get me Balance</button>
                </form>
    
                <br />
                <br />
    
                <h2>Transfer To Utility</h2>
                <form onSubmit={handleTransferTo}>
                <input placeholder="TransferToAddress" type="text" onChange={(event) => {setTransferTo(event.target.value)}} /> <br />
                <input placeholder="Amount (in ether)" type="text" onChange={(event) => {setTransferAmount(event.target.value)}} /> <br />
                <button type='Submit'>Transfer</button>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Install metamask</h2>
            </div>
        );
    }
    
}

export default Body;