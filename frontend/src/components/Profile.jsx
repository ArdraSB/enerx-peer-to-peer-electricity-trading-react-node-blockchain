import { useNavigate } from "react-router-dom"
import { response } from "../backend_integration/apis"
import {  FaPlus, FaUser } from "react-icons/fa"
import Input from "./Input"
import { useState } from "react"
import { getBalance, getMoneyBalance } from "../backend_integration/smart_contract_calls"


let Userdata;
function Profile(){
    const Sub =async (e) => {
        e.preventDefault()
        const form=e.target
        const frmdata=new FormData(form)
        const formJson= Object.fromEntries(frmdata.entries());
        console.log("ids",formJson);
       
        setisBid(false);
    }
    const [isBid,setisBid]=useState(false)
    const [isBid2,setisBid2]=useState(false)
    const [Energy,setEnergy]=useState(0)
    const [Money,setMoney]=useState(0)

    
    Userdata=response.data
    console.log("data in response",Userdata)

    const balnc=async ()=>{
        const EnergyBalance=await getBalance();
        setEnergy(EnergyBalance)
    }
    const mbalnc =async ()=>{
        const MoneyBalance=await getMoneyBalance()
        setMoney(MoneyBalance)
    }
    return(
        
        <div className="profile">
            <ul>
                <li><span className='icon'><FaUser/> </span></li>
                <li><h1>{Userdata.firstname+' '+Userdata.lastname}</h1></li>
                <li>{(Userdata.meterid==null)?
                <div className="plusbutton">
                    <span>no meter id</span>
                    <button onClick={()=>{setisBid(true)}}>Add</button></div>:Userdata.meterid}
               
                </li>
                <li>{(Userdata.walletid==null)?
                <div className="plusbutton">
                    <span>no wallet id</span>
                    <button onClick={()=>{setisBid2(true)}}>Add</button></div>:
                <div><h2>Address:<br></br></h2>{Userdata.walletid}</div>}
                </li>
                <li>{Userdata.doj}</li>


            </ul>
            <Dialogbox isOpen={isBid}  onClose={() => setisBid(false)} onSubmit={Sub} place="Meterid"/>
            <Dialogbox isOpen={isBid2}  onClose={() => setisBid2(false)} onSubmit={Sub} place="Walletid"/>

                    <button onClick={balnc}> Get Balance</button><br></br>
                    <h2>Traded Energy :{Energy}</h2>
                    <button onClick={mbalnc}>Get Balance</button>
                    <h2>Money Balance:{Money} ETH</h2>
        </div>
    )
}

function Dialogbox({isOpen,onClose,onSubmit,place}) {
  
    // {console.log("bid rendering",isOpen)}
    if (!isOpen) return null;
    return(
        
       <div className="bid-overlay">
        <div className="bid">
            <h2>Enter {place}</h2>
            <form onSubmit={onSubmit}>
                <Input type='text' name={place} place={place} />
        <div className="bid-buttons">
        <button className='cancel' onClick={onClose}>Cancel</button>
        <button className='submit' type='submit'>Submit</button>
        </div>
        </form>
        </div>
       </div>
        );
}

export {Profile,Dialogbox,Userdata}