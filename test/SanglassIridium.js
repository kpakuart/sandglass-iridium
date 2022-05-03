// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');

const OWNER_ADDRESS = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";

const DECIMALS = 2;

const AMT = 150

///////////////////////////////////////////////////////////
// SEE https://hardhat.org/tutorial/testing-contracts.html
// FOR HELP WRITING TESTS
// USE https://github.com/gnosis/mock-contract FOR HELP
// WITH MOCK CONTRACT
///////////////////////////////////////////////////////////

// Start test block
describe('SG', function () {
    before(async function () {
       
        const Token = await ethers.getContractFactory("SandglassIridium");
        this.hardhatToken = await Token.deploy("Sandglass Iridium", "IRDM","https://arweave.net/wjl82sgUf2EsZ0yrNqE588NC2qpP9cO3AauCkn-uRl0/", 750, OWNER_ADDRESS);
    });

    beforeEach(async function () {
       // this.sg = await this.SG.deploy("Sandglass Iridium", "IRDM","https://arweave.net/wjl82sgUf2EsZ0yrNqE588NC2qpP9cO3AauCkn-uRl0/", 750, OWNER_ADDRESS)
        //await this.sg.deployed()
        //const [owner, addr1, addr2] = await ethers.getSigners();
        //const Token = await ethers.getContractFactory("SandglassIridium");
        //const hardhatToken = await Token.deploy();
       
    });
   

    // Transfer 50 tokens from owner to addr1
   
    // Test cases

    //////////////////////////////
    //       Constructor 
    //////////////////////////////
    describe("Constructor", function () {
        it('mock test', async function () {
            // If another contract calls balanceOf on the mock contract, return AMT
            const balanceOf = Web3.utils.sha3('balanceOf(address)').slice(0,10);
            
        });
    });

    //////////////////////////////
    //  setRemainderDestination 
    //////////////////////////////
    describe("Only admin set Price", function () {
       
        it ('set price by non owner ', async function () {
            //await this.sg.attach('0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430');
            //await this.sg.setPrice(39399393)
            const [owner, addr1, addr2] = await ethers.getSigners();

            await this.hardhatToken.connect(addr1).setPrice(3939393, {gasLimit: 33330});
            //await this.hardhatToken.setPrice(3939393)
        });

        it ('set price by  owner ', async function () {
            //await this.sg.attach('0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430');
            //await this.sg.setPrice(39399393)

            
        });
        
        //sgC.setPrice(39999999)
    });
});