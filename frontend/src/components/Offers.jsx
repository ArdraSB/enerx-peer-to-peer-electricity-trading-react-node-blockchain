import React, { useState } from 'react';
// import  data from './Offers-data.js'
import './Offers.css'
import './Bid.css'
import Input from './Input';
import { FaCoins, FaBoxOpen, FaEthereum ,FaPlus} from "react-icons/fa"; // Import icons
import {createOffer, haveWallet,listOffers} from '../backend_integration/smart_contract_calls'


let data=await listOffers();
function Offers() {
    const [isbid,setisBid] = useState(false);
    
    const Sub =async (e) => {
        e.preventDefault()
        const form=e.target
        const frmdata=new FormData(form)
        const formJson= Object.fromEntries(frmdata.entries());
        console.log("bid details",formJson);
        await createOffer(formJson);
        setisBid(false);
    }
    const reload=async()=>{
        data=await listOffers();
    }
    
    
 
    return(
        <div className="offers">
        <h2 className="heading">Latest Bids</h2>
        <button className='addicon' onClick={() =>{ 
            if (haveWallet()){
                setisBid(true)
            }
            else{
                alert("You must add wallet and Smart meter details")
            }
            
            }}><FaPlus/></button>

       <Dialogbox isOpen={isbid} onClose={() => setisBid(false)} onSubmit={Sub}  />
        {console.log(data)}
        {data.length === 0 ? (
            <p>No offers</p>
        ) : (
            <ul>
                {data.map((para) => (
                    <li key={para.public_address}>
                        {console.log(para,para.price,para.quantity,para.public_address)}
                    
                        <Offer rate={para.price} quantity={para.price} address={para.public_address} />
                    </li>
                ))}
            </ul>
        )}
           
        </div>
    )
    
}


function Dialogbox({isOpen,onClose,onSubmit}) {
   
  
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
            <span id='quantity'>quantity:{props.quantity} </span>
            <span className='icon'><FaEthereum/> </span>
            <p id='address'>Public address:{props.address} </p>
        </div>
     );
 }
 
export {Offers,Dialogbox} 
