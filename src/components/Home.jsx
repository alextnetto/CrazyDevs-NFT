import WalletBalance from "./WalletBalance";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import CrazyDevs from "../artifacts/contracts/CrazyDevs.sol/CrazyDevs.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, CrazyDevs.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(count);
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1 style={{textAlign: 'center', margin: '1rem'}}>Crazy Devs NFT Collection</h1>
      <div className="container" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
        {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="col-sm">
              <NFTImage tokenId={i} getCount={getCount}/>
            </div>
          ))}
      </div>
    </div>
  );
};

function NFTImage({tokenId, getCount}) {
  const contentId = "QmavZQhHy4xqSZ25dR9id6mkkxwyQbiZTWdJRLGbmhDQYy";
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  // const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const addre = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const result = await contract.payToMint(addre[0], metadataURI, {
      value: ethers.utils.parseEther("0.005")
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }

  useEffect(() => {
    getMintedStatus();
  }, []);
  return (
    <div className="card" style={{ width: '18rem', margin: '3rem', }}>
      <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          <button className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
          
        )}
      </div>
    </div>
  );
} 

export default Home;
