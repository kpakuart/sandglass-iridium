import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './App.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function ImageGrid(props) {

    return (
        <div style={{padding: '0 25% 0 25%'}}>

            {
                <Carousel thumbWidth={80} infiniteLoop={true} autoPlay={true}>
                        <div>
                            <img src={require('./assets/A.png')}/>
                        </div>
                        <div>
                            <img src={require('./assets/B.png')}/>
                        </div><div>
                            <img src={require('./assets/C.png')}/>
                        </div><div>
                            <img src={require('./assets/D.png')}/>
                        </div><div>
                            <img src={require('./assets/E.png')}/>
                        </div><div>
                            <img src={require('./assets/F.png')}/>
                        </div><div>
                            <img src={require('./assets/G.png')}/>
                        </div><div>
                            <img src={require('./assets/H.png')}/>
                        </div><div>
                            <img src={require('./assets/I.png')}/>
                        </div><div>
                            <img src={require('./assets/J.png')}/>
                        </div><div>
                            <img src={require('./assets/K.png')}/>
                        </div><div>
                            <img src={require('./assets/L.png')}/>
                        </div><div>
                            <img src={require('./assets/M.png')}/>
                        </div>
                    </Carousel>
            }
        </div>
    ) 
}

export default ImageGrid;