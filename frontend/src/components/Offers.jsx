import React, { useState, useEffect } from 'react';
import './Offers.css';
import './Bid.css';
import Input from './Input';
import { FaCoins, FaBoxOpen, FaEthereum, FaPlus } from "react-icons/fa"; 
import { createOffer, haveWallet, listOffers, sendMoney } from '../backend_integration/smart_contract_calls';
import { Dialogbox } from './Profile';  

function Offers() {
    const [offers, setOffers] = useState([]);
    const [isBid, setIsBid] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ key: null, value: '' });

  const handleClick = (index) => {
    console.log("clicked",offers[index])
    setSelectedItem(offers[index]);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

    const AcceptOffer=
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await listOffers();
                setOffers(data);
            } catch (error) {
                console.error("Failed to fetch offers:", error);
                alert("Make sure Blockchain is connected");
            }
        };
        fetchOffers();
    }, []);

    const Sub = async (e) => {
        e.preventDefault();
        const form = e.target;
        const frmdata = new FormData(form);
        const formJson = Object.fromEntries(frmdata.entries());
        console.log("bid details", formJson);
        await createOffer(formJson);
        setIsBid(false);

        // Reload offers after submission
        const updatedOffers = await listOffers();
        setOffers(updatedOffers);
    };
    const Sub2  = async (e) => {
        e.preventDefault();
        const orgnlquant=parseInt(selectedItem.quantity)
        const form = e.target;
        const frmdata = new FormData(form);
        const formJson = Object.fromEntries(frmdata.entries());
        console.log(formJson)
        const quantity=formJson.desiredquantity
        console.log("bid desired", quantity,orgnlquant);
        try{
            if (quantity <= orgnlquant)
                {
                    console.log("ok",quantity,orgnlquant)
                    const item=selectedItem;
        
                    await sendMoney(item.public_address,quantity,item.price)
                }
                else{
                    alert("quantity should be less than offered quantity")
                    console.log("not ok",quantity,orgnlquant)
                }

        }catch(err){
            alert(err)
        }
       

        

        // // Reload offers after submission
        // const updatedOffers = await listOffers();
        // setOffers(updatedOffers);
    };

    return (
        <div className="offers">
            <h2 className="heading">Latest Bids</h2>
            
            <button className='addicon' onClick={() => { 
                if (haveWallet()) {
                    setIsBid(true);
                } else {
                    alert("You must add wallet and Smart meter details");
                }
            }}>
                <FaPlus />
            </button>

            <Bid isOpen={isBid} onClose={() => setIsBid(false)} onSubmit={Sub} />

            {offers.length === 0 ? (
                <p>No offers</p>
            ) : (
                <ul>
                    {offers.map((offer, index) => (
                        <li key={index}  onClick={() => handleClick(index)}
                        style={{ cursor: 'pointer', padding: '10px' }}>
                            <Offer 
                                rate={offer.price} 
                                quantity={offer.quantity} 
                                address={offer.public_address} 
                            />
                        </li>
                    ))}
                </ul>
            )}
            <Dialogbox isOpen={isOpen} onClose={() => setOpen(false)} onSubmit={Sub2} place="desiredquantity"></Dialogbox>
         
        {/* Dialog Box */}
      {/* {open && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h3>Item Details</h3>
            <p><strong>Key:</strong> {selectedItem.key}</p>
            <p><strong>Value:</strong> {selectedItem.value}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );

}

function Bid({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div className="bid-overlay">
            <div className="bid">
                <h2>Place Your Bid</h2>
                <form onSubmit={onSubmit}>
                    <Input type='number' name='quantity' place='Quantity' />
                    <Input type='number' name='price' place='Price' />
                    <div className="bid-buttons">
                        <button className='cancel' type='button' onClick={onClose}>Cancel</button>
                        <button className='submit' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Offer({ rate, quantity, address }) {
    return (
        <div className="main">
            <span className='icon'><FaCoins /> </span>
            <span id='rate'>Rate: {rate} </span>
            <span className='icon'><FaBoxOpen /> </span>
            <span id='quantity'>Quantity: {quantity} </span>
            <span className='icon'><FaEthereum /> </span>
            <p id='address'>Public address: {address} </p>
        </div>
    );
}

export { Offers};
