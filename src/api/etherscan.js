import axios from "axios";

const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;



// Funkcija za nalazenje transakcija
export const fetchTransactions = async (address, startBlock, endBlock) => {
  // Ako krajnji blok nije definisan, dohvatamo trenutni blok
  if (!endBlock) {
    endBlock = await fetchCurrentBlock();
  }

  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "1") {
      return response.data.result;
    } else {
      throw new Error(response.data.message || "No transactions found");
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};



// Funkcija za nalazenje trenutnog bloka
export const fetchCurrentBlock = async () => {
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      return parseInt(response.data.result, 16); // Vraća trenutni blok (heksadecimalan broj se konvertuje u decimalni)
    } catch (error) {
      console.error("Error fetching current block:", error);
      throw error;
    }
  };


  // Nalazi blok na osnovu datuma
  export const fetchBlockByDate = async (timestamp) => {
    const url = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      if (response.data.status === "1" && response.data.result) {
        return parseInt(response.data.result, 10); // Sigurnosna konverzija u broj
      } else {
        throw new Error(response.data.message || "Block not found");
      }
    } catch (error) {
      console.error("Error fetching block by date:", error);
      throw error;
    }
  };
  

  // Dohvati sve transakcije 
  export const fetchTokenTransactions = async (address) => {
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      if (response.data.status === "1") {
        return response.data.result; // Lista svih token transakcija
      } else {
        throw new Error(response.data.message || "No token transactions found");
      }
    } catch (error) {
      console.error("Error fetching token transactions:", error);
      throw error;
    }
  };
