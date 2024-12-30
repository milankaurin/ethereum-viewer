import { ethers } from "ethers";

// Postavljanje Infura providera
const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`
);

export const findClosestBlock = async (timestamp) => {
    try {
      // Postavi početni i krajnji broj bloka
      let low = 0; // Genesis blok
      let high = await provider.getBlockNumber(); // Trenutni broj bloka
  
      // Binarna pretraga
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const block = await provider.getBlock(mid);
  
        if (block.timestamp < timestamp) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
  
      // Vraćamo poslednji blok pre datuma
      const closestBlock = await provider.getBlock(high);
      return closestBlock.number;
    } catch (error) {
      console.error("Error finding closest block:", error);
      throw error;
    }
  };

// Funkcija za dobijanje balansa ETH na određenom bloku
export const fetchBalanceAtBlock = async (address, blockNumber) => {
  try {
    // Konvertuj blockNumber u BigInt
    const blockTag = BigInt(blockNumber);

    // Dohvati balans sa providera
    const balance = await provider.getBalance(address, blockTag);

    // Koristi ethers.utils.formatEther direktno
    return ethers.formatEther(balance); // Konvertuje iz wei u ETH
  } catch (error) {
    console.error("Error fetching balance at block:", error);
    throw error;
  }
};


export const fetchTokenBalanceAtBlock = async (address, contractAddress, blockNumber) => {
    try {
      const abi = [
        "function balanceOf(address) view returns (uint256)",
        "function decimals() view returns (uint8)",
      ];
      const contract = new ethers.Contract(contractAddress, abi, provider);
  
      const decimals = await contract.decimals(); 
      const balance = await contract.balanceOf(address, {
        blockTag: BigInt(blockNumber),
      });
  
      return ethers.formatUnits(balance, decimals); 
    } catch (error) {
      console.error("Error fetching token balance:", error);
      throw error;
    }
  };

 // Dohvata balans za određeni token kontrakt
 export const fetchTokenDetails = async (contractAddress) => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        ["function name() view returns (string)", "function symbol() view returns (string)"],
        provider
      );
      const name = await contract.name();
      const symbol = await contract.symbol();
      return { name, symbol };
    } catch (error) {
      console.error(`Error fetching details for contract ${contractAddress}:`, error);
      return { name: "Unknown", symbol: "Unknown" };
    }
  };
  
  // Dohvatanje balansa tokena
  export const fetchTokenBalance = async (contractAddress, walletAddress, blockNumber) => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        ["function balanceOf(address) view returns (uint256)"],
        provider
      );
  
      // Konverzija blockNumber u BigInt ako već nije
      const blockTag = BigInt(blockNumber);
  
      const balance = await contract.balanceOf(walletAddress, { blockTag });
      return ethers.formatUnits(balance, 18); // Konvertovanje u čitljiv format
    } catch (error) {
      console.error(`Error fetching balance for contract ${contractAddress}:`, error);
      return "Error fetching balance";
    }
  };
  
