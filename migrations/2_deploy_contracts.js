const PiperToken = artifacts.require("PiperToken");
const MySmartContract = artifacts.require("MySmartContract");
module.exports = async function (deployer,network,accounts) {
    deployer.deploy(PiperToken);
    const PToken = await PiperToken.deployed();
    
    deployer.deploy(MySmartContract,'0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',PToken.address);
    await MySmartContract.deployed();

    // Transfer all tokens to MySmartContract (1 million)
    await PToken.transfer(MySmartContract.address, '1000000000000000000000000');
};
