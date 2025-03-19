import { useNavigate } from "react-router-dom"
import { response } from "../backend_integration/apis"
import {  FaPlus, FaUser } from "react-icons/fa"
import Input from "./Input"
import { useState } from "react"



export default function Profile(){
    const Sub =async (e) => {
        e.preventDefault()
        const form=e.target
        const frmdata=new FormData(form)
        const formJson= Object.fromEntries(frmdata.entries());
        console.log("ids",formJson);
       
        setisBid(false);
    }
    const [isBid,setisBid]=useState(false)
    const Userdata=response.data
    // console.log("data in response",Userdata)
    return(
        
        <div className="profile">
            <ul>
                <li><span className='icon'><FaUser/> </span></li>
                <li><h1>{Userdata.firstname+' '+Userdata.lastname}</h1></li>
                <li>{(Userdata.meterid==null)?
                <div className="plusbutton">
                    <span>no meter id</span>
                    <button onClick={()=>{return(<Dialogbox isOpen={true}  onClose={() => setisBid(false)} onSubmit={Sub} place="Meterid"/>);}}>Add</button></div>:
                Userdata.meterid} 
               
                </li>
                <li>{(Userdata.walletid==null)?
                <div className="plusbutton">
                    <span>no wallet id</span>
                    <button onClick={function (){return(<Dialogbox isOpen={true}  onClose={() => setisBid(false)} onSubmit={Sub} place="Meterid"/>);}}>Add</button></div>:
                Userdata.walletid}
                </li>
                <li>{Userdata.doj}</li>


            </ul>
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

