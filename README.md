# Crazy Devs NTF

![CrazyDevImage] 

(This is my favorite one, Johnny Bravo drinking Pureza, a local soda from Santa Catarina, Brazil)

# Table of contents

- [Crazy Devs NTF](#crazy-devs-ntf)
- [About](#about)
- [Tools and tecnologies used](#tools-and-tecnologies-used)
- [Step-by-step](#step-by-step)
  - [Creating and uploading the images](#creating-and-uploading-the-images)
  - [Creating the smart contract](#creating-the-smart-contract)
  - [Testing the smart contract](#testing-the-smart-contract)
  - [Deploy the smart contract locally](#deploy-the-smart-contract-locally)
  - [Running the frontend](#running-the-frontend)
  - [Configuring MetaMask to localhost](#configuring-metamask-to-localhost)
    - [Import account](#import-account)
    - [Connect in localhost network](#connect-in-localhost-network)
  - [Minting your first Crazy Dev locally](#minting-your-first-crazy-dev-locally)
- [Next steps](#next-steps)
- [Inspiration](#inspiration)

# About

This is a NTF project made to learn, feel free to contribute. The project is deployed in Netlify, you can access [here][CrazyDevsLink]. 
Currently the ERC721 Smart Contract is deployed in Polygon Mumbai Testnet, this is why you can't see NTF's that already were minted or mint a Crazy Dev for you (unless you configure Polygon Mumbai network in yout MetaMask).

# Tools and tecnologies used 

 - [Figma] (Handmade art)
 - [Vite]
 - [React]
 - [Netlify] (Deploy frontend)
 - [Pinata] (IPFS)
 - [Ethers]
 - [Hardhat]
 - [MetaMask]
 - [Alchemy]
 - [Polygon]

# Step-by-step

## Creating and uploading the images

All the art was handmade, drawing different elements in each layer. Then I used a [script][NTF-art-generator-repo] to combine the 5 layers (pc, drink, hair, eyes and nose) and generate unique characters.

![figma-print]

The images were uploaded to IPFS, using [Pinata][pinata].

## Creating the smart contract

I used [OpenZeppelin][openzeppelin] wizard to generate and extend the ERC721, that is a standard for NFTs in blockchains that use EVM (Ethereum Virtual Machine), created some functions, like payToMint and wrote some tests.

## Testing the smart contract

This Tutorial assumes you have installed nodejs and npm.

First install all dependecies
 
```bash
npm i
```

Compile and test

```bash
npx hardhat compile
npx hardhat test
```

## Deploy the smart contract locally

We need a local EVM blockchain, open a second terminal and run
```bash
npx hardhat node
```
copy one private key, you will need it later.

In the first terminal, run the deploy script
```bash
npx hardhat run scripts/deploy.js --network localhost
```
it returns the contract's address

## Running the frontend

The app was built in React, using Vite. To run, use
```bash
npm run dev
```

## Configuring MetaMask to localhost

### Import account

Remember that private key you copied? In your MetaMask, go in "Import Account" and paste the private key.

### Connect in localhost network

Go in Settings > Networks, if you dont see a localhost network, add a network with these parameters:
 - Network Name: Localhost 8545
 - New RPC URL: http://localhost:8545
 - Chain ID: 31337
 - Currency Symbol: ETH

If you already have a localhost network configured, check if the parameters match with above.

## Minting your first Crazy Dev locally

Access http://localhost:3000/, click in "Mint", connect the app with your MetaMask, aprove the transaction and voliá, now you have a Crazy Dev!

# Next steps

 - Get feedbacks and the deploy the Smart Contract in Polygon Mainnet
 - Record a YouTube tutorial
 - Use ERC1155

# Inspiration
Fireship is a awesome channel in YT, I inspired my self for this project beacuse of [this][fireship-ntf-video] video. I've been studying Blockchain and Web3 concepts and fundamentals since July of 2021, now it's time to practice and put it to work!!


Feel free to contribute, correct me and connect on [LinkedIn]!

[CrazyDevImage]: https://gateway.pinata.cloud/ipfs/QmavZQhHy4xqSZ25dR9id6mkkxwyQbiZTWdJRLGbmhDQYy/0.png
[NTF-art-generator-repo]: https://github.com/Alextnetto/nft-art-generator
[figma-print]: https://raw.githubusercontent.com/Alextnetto/nft-art-generator/main/figma.png
[openzeppelin]: https://docs.openzeppelin.com/contracts/4.x/wizard
[CrazyDevsLink]: https://crazydevs.netlify.app/
[fireship-ntf-video]: https://www.youtube.com/watch?v=meTpMP0J5E8
[LinkedIn]: https://www.linkedin.com/in/alextnetto/
[figma]: https://www.figma.com/
[vite]: https://vitejs.dev/
[react]: https://reactjs.org/
[netlify]: https://www.netlify.com/
[pinata]: https://www.pinata.cloud/
[ethers]: https://docs.ethers.io/v5/
[hardhat]: https://hardhat.org/
[metamask]: https://metamask.io/
[alchemy]: https://www.alchemy.com/
[polygon]: https://polygon.technology/
