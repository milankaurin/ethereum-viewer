import React, { useState } from "react";
import { findClosestBlock, fetchBalanceAtBlock, fetchTokenBalance, fetchTokenDetails } from "../api/infura";
import { fetchBlockByDate, fetchTokenTransactions } from "../api/etherscan";

function BalanceAtDatePage() {
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [ethBalance, setEthBalance] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckBalances = async () => {
    setLoading(true);
    try {
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        alert("Invalid wallet address!");
        setLoading(false);
        return;
      }

      const timestamp = Math.floor(new Date(date).getTime() / 1000);
      console.log("Timestamp (UTC):", timestamp);

      const blockNumber = await fetchBlockByDate(timestamp);
      console.log("Block Number:", blockNumber);

      const ethBalance = await fetchBalanceAtBlock(address, blockNumber);
      setEthBalance({ balance: ethBalance, blockNumber, date });

      const transactions = await fetchTokenTransactions(address);
      const tokenContracts = [...new Set(transactions.map((tx) => tx.contractAddress))];

      const tokenBalances = await Promise.all(
        tokenContracts.map(async (contract) => {
          const { name, symbol } = await fetchTokenDetails(contract);
          const balance = await fetchTokenBalance(contract, address, blockNumber);
          return { contract, name, symbol, balance };
        })
      );

      setTokenBalances(tokenBalances);
    } catch (error) {
      console.error("Error fetching balances:", error);
      alert("An error occurred while fetching balances. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

<div
  style={{
   
    width: "100%",
    backgroundColor: "#1e1e1e", 
    color: "#ffffff", 
    padding: "40px", 
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", 
  }}
>
        <h1 style={{ marginBottom: "20px" }}>Balances at Specific Date</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckBalances();
          }}
          style={{ marginBottom: "20px" }}
        >
          <div className="form-group">
            <label>Wallet Address:</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address"
              required
              style={{ marginBottom: "10px" }}
            />
          </div>
          <div className="form-group">
            <label>Date (YYYY-MM-DD):</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ marginBottom: "10px" }}
            />
          </div>
          <button
      type="submit"
      
      disabled={loading}
      style={{
        width: "100%", 
        className:"button",
        fontSize: "16px",
        marginTop: "10px",
      }}
    >
      {loading ? "Loading..." : "Check Balances"}
    </button>
        </form>

        <div>
          {ethBalance && (
            <div className="mb-4" style={{ marginBottom: "20px" }}>
              <h2>ETH Balance</h2>
              <p>
                Balance on {ethBalance.date}: <strong>{ethBalance.balance}</strong> ETH
              </p>
              <p>Block Number: {ethBalance.blockNumber}</p>
            </div>
          )}

          {tokenBalances.length > 0 && (
            <div>
              <h2>Token Balances</h2>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Token Contract</th>
                    <th>Token Name</th>
                    <th>Symbol</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenBalances.map((token) => (
                    <tr key={token.contract}>
                      <td>{token.contract}</td>
                      <td>{token.name}</td>
                      <td>{token.symbol}</td>
                      <td>{token.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    
  );
}

export default BalanceAtDatePage;
