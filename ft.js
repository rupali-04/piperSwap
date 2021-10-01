const Web3 = require('web3');
const web3 = new Web3('https://kovan.infura.io/v3/e8d5474e44074334b5f281433b5c3b7c');
const MySmartContract = artifacts.require("MySmartContract");
const TruffleContract = artifacts.require('IERC20');
const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  var account = '0x809C038a02791B18C06ed7947B2c74F41EC2700D';
  var address = '0x4f96fe3b7a6cf9725f59353f723c1bdb64ca6aa';
  module.exports = async function(callback) {
    const mySmartContract = await MySmartContract.deployed();
    const dai = await TruffleContract.at('0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa');
    var contract = new web3.eth.Contract(abi,address);
    //var dai = await contract.clone();
    console.log(dai.address);
    const balance = await contract.methods.balanceOf('0x809C038a02791B18C06ed7947B2c74F41EC2700D').call();
    const allowed = await contract.methods.allowance('0x809C038a02791B18C06ed7947B2c74F41EC2700D',mySmartContract.address).call();
    console.log(balance);
    console.log('before: ',allowed.toString());
    const t = await dai.approve(mySmartContract.address, web3.utils.toWei('100','ether'));
    //const r = await contract.methods.transferFrom(account,mySmartContract.address,web3.utils.toWei('100','ether'));
    console.log(mySmartContract.address);
    const allowedafter = await contract.methods.allowance('0x809C038a02791B18C06ed7947B2c74F41EC2700D',mySmartContract.address).call();
    console.log('after: ',allowedafter.toString());
    const balanceS = await contract.methods.balanceOf(mySmartContract.address).call();
    console.log(balanceS.toString());
    callback();
  }