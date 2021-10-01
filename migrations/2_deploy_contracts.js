const PiperToken = artifacts.require("PiperToken");
const DaiToken = artifacts.require("IERC20")
const MySmartContract = artifacts.require("MySmartContract");
module.exports = async function (deployer,network,accounts) {
    await deployer.deploy(PiperToken);
    const PToken = await PiperToken.deployed();
    const dToken = await DaiToken.at('0x4f96fe3b7a6cf9725f59353f723c1bdb64ca6aa');
    await deployer.deploy(MySmartContract,'0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',PToken.address);
    await MySmartContract.deployed();

    // Transfer all tokens to MySmartContract (1 million)
    await PToken.transfer(MySmartContract.address, '1000000000000000000000000');
};
