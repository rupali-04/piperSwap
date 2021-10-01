
var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "tiny trumpet hover guilt lion cream couch holiday dynamic pet miss olympic";
module.exports = {
 networks: {
  development: {
   host: "127.0.0.1",
   port:  7545,
   network_id: "*"
  },
  kovan: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://speedy-nodes-nyc.moralis.io/79556231d8f053fbadc2f797/eth/kovan");
      },
      from: "0x809C038a02791B18C06ed7947B2c74F41EC2700D",
      network_id: 42,
      gas: 4500000,
      gasPrice: 10000000000,
  }
 },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    }
  },

  
};
