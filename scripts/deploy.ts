import { 
  Contract, 
  ContractFactory,
  BigNumber
} from "ethers"
import { ethers } from "hardhat"
//0xcbC65Ac9Df973Ebc05a8b73fc72986f585b349F3 test-mame 0xcbC65Ac9Df973Ebc05a8b73fc72986f585b349F3
const main = async(): Promise<any> => {
  
  const Token = await ethers.getContractFactory("SandglassIridium");
  const token = await Token.deploy("Sandglass Iridium", "IRDM","https://arweave.net/wjl82sgUf2EsZ0yrNqE588NC2qpP9cO3AauCkn-uRl0/", 750, '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC')

  await token.deployed();

  
  console.log("NFT contract deployed to:", token.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
