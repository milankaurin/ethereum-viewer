import React, { useState } from 'react';
import { fetchCurrentBlock, fetchTransactions } from "../api/etherscan";

function TransactionsPage() {
  const [address, setAddress] = useState('');
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState(''); // Opcionalni endBlock
  const [transactions, setTransactions] = useState([]);
  const handleFetchTransactions = async () => {
    try {
      const finalEndBlock = endBlock || (await fetchCurrentBlock());
  
      if (parseInt(startBlock, 10) > parseInt(finalEndBlock, 10)) {
        alert("Start block cannot be greater than end block.");
        return;
      }
  
      const data = await fetchTransactions(address, startBlock, finalEndBlock);
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert(error.message || "An error occurred while fetching transactions");
    }
  };
  return (
    <div>
      <h1>Ethereum Transactions</h1>
      <div className="form-group">
        <label>Wallet Address:</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Start Block:</label>
        <input
          type="number"
          className="form-control"
          value={startBlock}
          onChange={(e) => setStartBlock(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>End Block (optional):</label>
        <input
          type="number"
          className="form-control"
          value={endBlock}
          onChange={(e) => setEndBlock(e.target.value)}
          placeholder="Leave empty for latest block"
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleFetchTransactions}>
        Search
      </button>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Block Number</th>
            <th>From</th>
            <th>To</th>
            <th>Value (ETH)</th>
            <th>Gas Used</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td>{tx.blockNumber}</td>
              <td>{tx.from}</td>
              <td>{tx.to}</td>
              <td>{(tx.value / 10 ** 18).toFixed(4)} ETH</td>
              <td>{tx.gasUsed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsPage;
