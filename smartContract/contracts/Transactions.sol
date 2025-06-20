
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransferStruct[] transactions;

    function addToBlockchain(address payable reciever , uint amount , string memory message, string memory keyword) public{
        transactionCount+=1;
        transactions.push(TransferStruct(msg.sender, reciever, amount, message, block.timestamp, keyword));
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    function getAllTransactions() public view return (TransferStruct[] memory){
        return transactions;
    }
    function getTransactionsCount() public view return (uint256){
        return transactionCount;
    }

}