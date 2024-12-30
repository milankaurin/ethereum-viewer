# ethereum-viewer

This project is a simple Ethereum Viewer application that allows users to fetch Ethereum balances and ERC-20 token balances for a specific wallet address at a specific date. The application also includes functionality to retrieve transactions and token information.

---

## How to Run the Project

Follow these steps to set up and run the project locally:

1. **Clone the Repository or download it as ZIP**
2. Install Dependencies
```bash 
npm install
```

3. Run the Development Server
```bash 
npm run dev
```

4. Access the Application
Open your browser and navigate to link provided by console.

## Application Functionalities
### Features
Transactions Page:
The first page of the application allows you to fetch and display Ethereum transactions for a given wallet address.

### How it Works:

**Enter a wallet address, a starting block, and optionally an ending block. The application will fetch all transactions within the provided range.**

**ERC-20 Token Balances:**
Fetch and display the balances of ERC-20 tokens for a wallet address at a specific date.

**Token Metadata:**
Retrieve and display token details, including token name and symbol.

**Error Handling:**
If an error occurs (e.g., invalid input or API issues), an error message will be displayed in the browser's developer console.
ETH Balance at a Specific Date:
Retrieve the Ethereum balance of a given wallet address at a specific date using historical block data.

## NOTE
**The repository includes pre-configured API keys for Infura and Etherscan in the .env file. These keys were left intentionally for ease of use during testing and development:**


