//const Dai = artifacts.require("Dai");
const MySmartContract = artifacts.require("MySmartContract");
module.exports = async function (deployer,network,accounts) {
    deployer.deploy(MySmartContract,'0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735');
    await MySmartContract.deployed();

};
