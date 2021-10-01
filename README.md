# piperSwap
Decentralized Exchange Application 

PiperSwap is a Decentralized Exchange Application where we have created a Platform which would accept Tokens from the User and in return will provide some PToken (Piper Token).

Working of the Application:
1. Connect your Metamask Wallet with the Application.
2. Enter the amount of Dai Token you need to invest.
3. You will recive some PiperToken in return of the Dai Token

Internal Working of the System:
1. The Dai Token recived from the user will be used to set Limit Orders using 1inch Limit-Order-Protocol
2. This Limit Order will be set Automatically at an interval.
3.  MakerAsset: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa' (Dai)
    TakerAsset: '0xd0a1e359811322d97991e03f863a0c30c2cf029c' (WEth)

Commands to Run Project:
1. Clone the Repo
2. run npm install
3. React App: npm run start
4. Limit-order App: truffle --network kovan limit.js

Some Important Address:
Token Address: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa' (Dai)
               '0xd0a1e359811322d97991e03f863a0c30c2cf029c' (WEth)
Contract Address: '0x2BC7E7123CDFdA75722E1E745098FA8016731602'
1inch Limit Order Address: '0x94Bc2a1C732BcAd7343B25af48385Fe76E08734f'

    
