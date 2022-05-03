import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SandglassIridium from './artifacts/contracts/SandglassIridium.sol/SandglassIridium.json';
import ImageGrid from './ImageGrid';
import AlertModal from './AlertModal';
import AlertModalFail from './AlertModalFail';
import { TextField, Button } from '@mui/material';
const contractAddress = "0x3788f981a2082d2Ea872bAee1aF2c77C1F8cb209"//"0xE3573540ab8A1C4c754Fd958Dc1db39BBE81b208";

function App() {
  const [supply, setSupply] = useState(0);
  const [amountInput, setAmountInput] = useState(0);
  const [open, setOpen] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  async function connectWallet() {
    
    if (window.ethereum && window.ethereum.selectedAddress === null) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }
    useEffect(() => {
      getSupply();

      if(window.ethereum) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        })
        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        })
      }
    }, []);

  async function mint() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SandglassIridium.abi, signer);
   
        let price = 150000000000000000 * amountInput;
        
        try {
          const transaction = await contract.mint(amountInput, {value: price.toString()});
          await transaction.wait();
        
          getSupply();
          setOpen(true);
        } catch (err) {
          
          console.log(err)
          setOpenFail(true);
        }
      }
  }

  async function getSupply() {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, SandglassIridium.abi, provider);

          try {
            const data = await contract.totalSupply();
            setSupply((await data).toString());
            return data;
          } catch (err) {
            console.log(err);
          }
      }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFail = () => {
    setOpenFail(false);
  };

  return (
    <div className="App" style={{height: '100%', backgroundColor: '#F0F8FF' /*'#98FB98'*/}}>
                <header className="App-header" style={{backgroundColor: 'black', minHeight: '70px'}}>
                  {
                        !window.ethereum?.selectedAddress ?
                          <div className="headerContent">
                              <h5>Connect your wallet</h5>
                              
                              <Button className="btn" variant="contained" onClick={connectWallet}>
                                Connect
                              </Button>
                          </div>
                        : 
                          <div className="headerContent">
                              <h6 style={{fontSize: '15px', marginLeft: '1rem'}}> <a href="google.com">Check collection at NFTrade</a></h6>
                              <h5 style={{fontSize: '15px', paddingRight: '1rem'}}>{window.ethereum?.selectedAddress}</h5>
                          </div>
                  }
                </header>
                <div>
                <div>
                    <h1 className="headerTitle" >Sandglass Iridium</h1>
                    <h4 style={{color: 'black', fontFamily: 'Monaco', fontSize: '20px'}}>729 generative art NFTs like you have never seen before</h4>
                    <h5 style={{color: 'black', fontFamily: 'Monaco', fontSize: '15px'}}>Check out the collection at <a href="google.com">NFTrade</a></h5>
                    <div>
                      <ImageGrid></ImageGrid>
                    </div>
                    <div>
                      <div>
                        <div>
                          <h4>
                              A generative art collection that you can mint on the <a href='https://www.avax.network/' target="_blank">Avalanche blockchain</a>. Nothing more, nothing less. 
                          </h4>
                          <h5>
                              Each piece is unique and randomly generated. Image and metadata are stored for all eternity on <a href='https://www.arweave.org/' target="_blank">Arweave</a>.
                          </h5>
                        </div>
                        {
                          window.ethereum && window.ethereum.selectedAddress !== null?
                          <div>
                              {
                                supply < 729 ? 
                                <div className='mintContainer' style={{}}>
                                    <h2>Mint Tokens</h2>
                                    <h5>Enter amount # to mint, limit is 20 at a time!</h5>
                                    <TextField id="outlined-basic" type="number" label="Mint Amount (1-20)" variant="filled" onChange={e => setAmountInput(parseInt(e.target.value, 10))}/>
                                    <div style={{paddingTop: '5px'}}>
                                      <Button className="btn" variant="contained" onClick={mint}>
                                        Mint
                                      </Button>
                                    </div>
                                    <div><h3>{supply + ' / ' + 729 + ' Minted'}</h3></div>
                                </div>
                              :  
                                <div>
                                    <h2>All tokens have been minted!</h2>
                                    <h4>Check out the collection at NFTrade (linke) </h4>
                                    <div><h3>{supply + ' / ' + 729 + ' Minted'}</h3></div>
                                </div>
                              }
                              <p>
                                The art was created from a generative algorithm I constructed with Canvas. The center 'entity' attribute was created using Adobe Illustrator.
                                There are five total layers of assets that represent the attributes. These assets were layered and combined using the Hashlips NFT creation algorithm. The metadata
                                and PNG are stored on Arweave. Although 750 images were originally created, only 729 can be minted due to an issue
                                with the Arweave bundle upload. 
                              </p>
                          </div>
                              :
                              <div className='mintContainer'>
                                 <h1 style={{color: 'red'}}>Connect your crypto wallet to mint!</h1>  
                              </div>
                          }
                        </div>
                    <div style={{padding: '0 20% 0 20%'}}>
                      <h4>
                          Mint price is 0.15 AVAX (cheap!). 20 tokens can be minted at one time.
                      </h4>
                      <ul style={{ textAlign: 'left', alignItems: 'center'}}>
                        <h4>Mint proceeds will go to the following:</h4>
                        <li>Palianytsia the Ukrainian refugee humanitarian fund (https://palianytsia.com.ua/). </li>
                        <li>Street Art for Mankind, foundation for preventing child labor through street art (https://streetartmankind.org/. </li>
                        <li>To fund any future web3/NFT projects I build.</li>
                      </ul>
                    </div>
                  </div>  
                </div>
                  <div className='mintContainer'>
                    <h2>About the creator</h2>
                    <p style={{padding: '0 70px 0 70px'}}>I am software developer and digitial artist (or at least I aspire to be an artist :D ). 
                      I have been dabbling in the crypto/blockchain space for several years now. However recently the web3/NFT/metaverse space
                      has captivated me, and it is my goal truly be a part of this space full time. This project is just one small step of something much bigger. I also just want to create cool art and build amazing things.
                    </p>
                  </div>
               </div>
               <AlertModal open={open} handleClose={handleClose}/>
               <AlertModalFail openFail={openFail} handleCloseFail={handleCloseFail}/>
    </div>
  );
}

export default App;