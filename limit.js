const axios = require('axios');
const LimitOrder = require('@1inch/limit-order-protocol')
const Web3 = require('web3');
const ethers = require('ethers');
const parseUnits = ethers.utils.parseUnits
const formatUnits =ethers.utils.formatUnits
const BN = ethers.BigNumber;
const LOPABI = require('@1inch/limit-order-protocol/abi/LimitOrderProtocol.json');
const WalletConnect = require("@walletconnect/web3-provider");
const DAI = {"symbol": "DAI", "name": "Dai Stablecoin", "decimals": 18,
     "address": "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"}
     //"logoURI": "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png"}
module.exports = async function(callback) {
 
    //const LimitOrderProtocolFacade = require('@1inch/limit-order-protocol');
const contractAddress = '0x94Bc2a1C732BcAd7343B25af48385Fe76E08734f';
const walletAddress = '0x809C038a02791B18C06ed7947B2c74F41EC2700D';

const NODE_URL = "https://speedy-nodes-nyc.moralis.io/79556231d8f053fbadc2f797/eth/kovan";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);
//const signer = provider.getSigner();
//const web3 = new Web3('');
// You can create and use a custom provider connector (for example: ethers)
const connector = new LimitOrder.Web3ProviderConnector(web3);
const chainId = 42;

//await connector.enable();


const privateKeyProviderConnector = new LimitOrder.PrivateKeyProviderConnector(
    '8e0141c8c22710cb3546ebb80f1d757e2eb510676a897f54cd0502eec674aee9',
    web3
);
async function createLimitOrder(livetime){
    const limitOrderBuilder = new LimitOrder.LimitOrderBuilder(
        contractAddress,
        chainId,
        privateKeyProviderConnector
    );
    
    
    const limitOrderProtocolFacade = new LimitOrder.LimitOrderProtocolFacade(
        contractAddress,
        privateKeyProviderConnector
    );
    //const limitOrderProtocolFacade = new limitOrderProtocolFacade(contractAddress, privateKeyProviderConnector)
        const timestampBelow = new LimitOrder.LimitOrderPredicateBuilder(limitOrderProtocolFacade);
    // Create a limit order and it's signature
    let simplePredicate = timestampBelow.timestampBelow(Math.round(Date.now() / 1000) + livetime);
    
    const limitOrder = await limitOrderBuilder.buildLimitOrder({
        makerAssetAddress: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
        takerAssetAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
        makerAddress: walletAddress,
        makerAmount: '100',
        takerAmount: '0',
        predicate: simplePredicate,
       
        
    });
    console.log(limitOrder);
    const limitOrderTypedData = await limitOrderBuilder.buildLimitOrderTypedData(
        limitOrder
    );
    
    //console.log(limitOrderHash);
    console.log(limitOrderTypedData.message);
    //console.log('hey');
    // console.log(await connector.web3Provider.currentProvider.send({"jsonrpc":"2.0","method":"eth_signTypedData_v4","params":[
    //     walletAddress,
    //     JSON.stringify(limitOrderTypedData),
    // ],"id":1}));
    //console.log(await connector.signTypedData(walletAddress,limitOrderTypedData));
    //console.log('bye');
    // let limitOrderSignature; 
    // try{
    //     limitOrderSignature = await limitOrderBuilder.buildOrderSignature(
    //     walletAddress,
    //     limitOrderTypedData
    // );}catch(err){
    //     console.log(err);
    // }
    // console.log(limitOrderSignature);
    
    
    
    const limitOrderSignature = await privateKeyProviderConnector.signTypedData(
        walletAddress,
        limitOrderTypedData
    );
    //console.log(limitOrderSignature);
    
    const order = limitOrder;
    const signature = limitOrderSignature;
    
    const makerAmount = '400000000';
    const takerAmount = '0';
    const thresholdAmount = '6000000';
    
    // Create a call data for fill the limit order
    const callData = await limitOrderProtocolFacade.fillLimitOrder(
        order,
        signature,
        makerAmount,
        takerAmount,
        thresholdAmount
    );
    // console.log(callData);
    let limitOrderHash = await limitOrderBuilder.buildLimitOrderHash(limitOrderTypedData);
    //console.log(limitOrderHash);
    // const id = await web3.eth.net.getId();
    // console.log(id);
    const contract = new web3.eth.Contract(
        LOPABI,
        contractAddress
    );
    
    // Send transaction for the order filling
    // Must be implemented
    //console.log(await privateKeyProviderConnector.ethCall(walletAddress,callData));
    try {
        const res = await contract.methods.fillOrder(order,
            signature,
            makerAmount,
            takerAmount,
            thresholdAmount).send({
            from: walletAddress,
            // gas: 2100000, // Set your gas limit
            // gasPrice: 40000, // Set your gas price
            to: contractAddress,
            data: callData
        });
        return res;
           
    } catch (error) {
        console.log(error);    
    }
     //console.log(limitOrderTypedData.message.toString('hex'));
    // postData = {
    //     orderHash: limitOrderHash,
    //     orderMaker: walletAddress,
    //     createDateTime: new Date(),
    //     signature: limitOrderSignature,
    //     makerAmount: '100',
    //     takerAmount: '10',
    //     data: limitOrderTypedData.message
    // }
    // //console.log(JSON.parse(postData));
    //     res = await axios.post('https://limit-orders.1inch.exchange/v1.0/1/limit-order',postData);
    
    //     return res.data;
    
}

async function approveT(token, target, env) {
    let tokenC = await getC(token.address,IERC20ABI.abi, env)
    return await tokenC.approve(target,ethers.constants.MaxUint256,{gasPrice:'5000000000', gasLimit:'1000000'} )

}
return createLimitOrder(600);
callback();
}