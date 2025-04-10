import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userdata,publicKey, fetchThingSpeakData } from "../backend_integration/apis";
import { FaPlus, FaUser, FaEthereum } from "react-icons/fa";
import Input from "./Input";
import { saveMeter,saveWallet } from "../backend_integration/apis";
import {getBalance, getMoneyBalance} from "../backend_integration/smart_contract_calls";
import './Profile.css';  // Import the new CSS file


let Userdata;
let address;
function Profile() {
    
    const [isBid, setisBid] = useState(false);
    const [isBid2, setisBid2] = useState(false);
    const [Energy, setEnergy] = useState(0);
    const [Money, setMoney] = useState(0);
    const [Consumption,setConsumption]=useState(0);
    const [Generation,setGeneration]=useState(0);
    try{
        Userdata = userdata;
        address=publicKey.toString();
        console.log(address)
    }catch(err){
        alert(err)
    }
    

    const addWallet = async (e) => {
        e.preventDefault();
        const form = e.target;
        const frmdata = new FormData(form);
        const formJson = Object.fromEntries(frmdata.entries());
        console.log("ids", formJson);
        try{
            await saveWallet(formJson);
        }catch(err){
            alert(err);
        }
        setisBid2(false);
    };
    const addMeter = async (e) => {
        e.preventDefault();
        const form = e.target;
        const frmdata = new FormData(form);
        const formJson = Object.fromEntries(frmdata.entries());
        console.log("ids", formJson,Userdata);
        try{
            await saveMeter(formJson);
        }catch(err){
            alert(err);
        }
        setisBid(false);
    };

    const balnc = async () => {
        try{
        const EnergyBalance = await getBalance();
        setEnergy(EnergyBalance);
        }catch(err){
            alert("unable to fetch data");
        }
        
    };

    const mbalnc = async () => {
        try{
        const MoneyBalance = await getMoneyBalance();
        setMoney(MoneyBalance);
        }catch(err){
            alert("unable to fetch data");
        }
        
    };
    const getConsumption=async()=>{
        try{
        const c=await fetchThingSpeakData(1);
        setConsumption(c);
        }catch(err){
            alert("unable to fetch data");
        }
        
    }
    const getGeneration=async()=>{
        try{
            const c=await fetchThingSpeakData(2);
        setGeneration(c);

        }catch(err){
            alert("unable to fetch data");
        }
        
    }
    return (
        <div className="profile-container">
       
            <div className="profile-card">
                <div className="profile-header">
                    <FaUser className="user-icon" />
                    <h1>{Userdata.firstname + ' ' + Userdata.lastname}</h1>
                    <p>Member since: {Userdata.doj.toString().split('T')[0]}</p>
                </div>

                <div className="profile-details">
                    <div className="detail">
                        <h3>Meter ID:</h3>
                        {Userdata.meterid ? (
                            <span>{Userdata.meterid}</span>
                        ) : (
                            <div className="action">
                                <span>No Meter ID</span>
                                <button onClick={() => setisBid(true)}>
                                    <FaPlus /> Add
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="detail">
                        <h3>Wallet ID:</h3>
                        {Userdata.walletid ? (
                            <div className="wallet-box">
                                <FaEthereum className="wallet-icon" />
                                <span>{address}</span>
                            </div>
                        ) : (
                            <div className="action">
                                <span>No Wallet ID</span>
                                <button onClick={() => setisBid2(true)}>
                                    <FaPlus /> Add
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="balance-section">
                        <button className="btn" onClick={balnc}>Get Energy Balance</button>
                        <h2>Traded Energy: {Energy} Ws</h2>

                        <button className="btn" onClick={mbalnc}>Get Money Balance</button>

                        <h2>Money Balance: {Money} ETH</h2>
                        {Userdata.meterid?(
                            <div>
                        <button className="btn" onClick={getConsumption}>Get Consumption Data</button>
                        <h2>Consumption: {Consumption} Ws</h2>

                        <button className="btn" onClick={getGeneration}>Get Generation Data</button>
                        <h2>Generation: {Generation} Ws</h2>
                        </div>
                        ):(<span></span>)}
                    </div>
                </div>
            </div>

            <Dialogbox isOpen={isBid} onClose={() => setisBid(false)} onSubmit={addMeter} place="meterId" />
            <Dialogbox isOpen={isBid2} onClose={() => setisBid2(false)} onSubmit={addWallet} place="walletId" />
       </div>
    );
}

function Dialogbox({ isOpen, onClose, onSubmit, place}) {
    if (!isOpen) return null;
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h2>Enter {place}</h2>
                <form onSubmit={onSubmit}>
                    <Input type='text' name={place} place={place} />
                    <input type='hidden' name='phone' value={userdata.id}/>
                    <div className="dialog-buttons">
                        <button className='btn-cancel' onClick={onClose}>Cancel</button>
                        <button className='btn-submit' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { Profile, Dialogbox, Userdata };
