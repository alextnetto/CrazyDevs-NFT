const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const CrazyDevs = await ethers.getContractFactory("CrazyDevs");
    const crazyDevs = await CrazyDevs.deploy();
    await crazyDevs.deployed();

    const recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
    const uri = "cid/test.pn";

    let balance = await crazyDevs.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await crazyDevs.payToMint(recipient, uri, {
      value: ethers.utils.parseEther("0.005"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await crazyDevs.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await crazyDevs.isContentOwned(uri)).to.equal(true);
  });

  it("Should reject mint an NFT with repeated URI", async function () {
    const CrazyDevs = await ethers.getContractFactory("CrazyDevs");
    const crazyDevs = await CrazyDevs.deploy();
    await crazyDevs.deployed();

    const recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
    const uri = "cid/test.png";

    let balance = await crazyDevs.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await crazyDevs.payToMint(recipient, uri, {
      value: ethers.utils.parseEther("0.005"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await crazyDevs.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(
      crazyDevs.payToMint(recipient, uri, {
        value: ethers.utils.parseEther("0.005"),
      })
    ).to.be.revertedWith("NTF already minted");
  });
});
