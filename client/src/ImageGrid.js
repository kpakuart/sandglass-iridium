import { styled } from '@mui/material/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './App.css';


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