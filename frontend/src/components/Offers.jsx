import React, { useState } from 'react';
// import  data from './Offers-data.js'
import './Offers.css'
import './Bid.css'
import Input from './Input';
import { FaCoins, FaBoxOpen, FaEthereum ,FaPlus} from "react-icons/fa"; // Import icons




function Offers() {
    const [isbid,setisBid] = useState(false);
    
    const Sub =(e) => {
        e.preventDefault()
        const form=e.target
        const frmdata=new FormData(form)
        const formJson= Object.fromEntries(frmdata.entries());
        console.log("bid details",formJson);
        setisBid(false);
    }
    
    

    const data=[
        {rate:230,quan:20,paddress:14563336},
        {rate:233,quan:50,paddress:541256},
        {rate:240,quan:100,paddress:5545852}
        
    ]
 
    return(
        <div className="offers">
        <h2 className="heading">Latest Bids</h2>
        <button className='addicon' onClick={() => setisBid(true)}><FaPlus/></button>

       <Bid isOpen={isbid} onClose={() => setisBid(false)} onSubmit={Sub}  />
        
            <ul>
                {data.map(
                    function(para) {
                    return <li key={para.paddress}><Offer rate={para.rate} quan={para.quan} paddress={para.paddress}  /></li>
                })
                }
                
            </ul>
           
        </div>
    )
    
}


function Bid({isOpen,onClose,onSubmit}) {
   
  
    {console.log("bid rendering",isOpen)}
    if (!isOpen) return null;
    return(
        
       <div className="bid-overlay">
        <div className="bid">
            <h2>Place Your Bid</h2>
            <form onSubmit={onSubmit}>
                <Input type='number' name='quantity' place='Quantity' />
                <Input type='number' name='price' place='Price'/>
        <div className="bid-buttons">
        <button className='cancel' onClick={onClose}>Cancel</button>
        <button className='submit' type='submit'>Submit</button>
        </div>
        </form>
        </div>
       </div>
        
    );
}




 function Offer (props) {
    return ( 
        <div className="main">
            <span className='icon'><FaCoins/> </span>
            <span id='rate'>rate:{props.rate} </span>
            <span className='icon'><FaBoxOpen/> </span>
            <span id='quan'>quantity:{props.quan} </span>
            <span className='icon'><FaEthereum/> </span>
            <p id='address'>Public address:{props.paddress} </p>
        </div>
     );
 }
 
export default Offers 
