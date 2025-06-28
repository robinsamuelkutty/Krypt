import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const {ethereum}=window

const getEthereumContract = () => {
  const ethereum = window.ethereum;
  if (!ethereum) {
    alert("Ethereum object not found. Please install MetaMask.");
    throw new Error("Ethereum object not found");
  }
  console.log("Ethers:", ethers);
  const provider = new BrowserProvider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({ provider, signer, transactionContract });
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));


  const handleChange =(e,name)=>{
    setFormData((prevState)=> ({...prevState,[name]:e.target.value}));
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        //getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error("Error checking wallet:", error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      if (!currentAccount) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
      }   

    } catch (error) {
      console.log("Error connecting wallet:", error);

      throw new Error("No Ethereum Account");
    }
  };

  const sendTransaction = async () => {
    try {
      console.log("currentAccount:", currentAccount);
      if (!ethereum) return alert("Please install Metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parseAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 Gwei
          value: parseAmount._hex, // Convert amount to wei
        }]
      })
      const transactionHash= await transactionContract.addToBlockchain(addressTo, parseAmount,  message,keyword);
      
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`); 
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.location.reload();
    } catch (error) {
      console.log("Error connecting wallet:", error);

      throw new Error("No Ethereum Account");
      
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{connectWallet,currentAccount, formData,setFormData,handleChange, sendTransaction, isLoading, transactionCount}}>
      {children}
    </TransactionContext.Provider>
  );
};
