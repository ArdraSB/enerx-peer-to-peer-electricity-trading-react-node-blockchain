import React, { useState } from 'react';
import './Register.css'
import Input from './Input';
import { useNavigate} from 'react-router-dom';
import {login,register} from "../backend_integration/apis"





function Register() {

    
    const [action,setaction] = useState("Login")
    const navigate=useNavigate()
    const submit=async (e)=>{
        console.log("hai")
        e.preventDefault();
        const form=e.target
        const data=new FormData(form)
        const formJson= Object.fromEntries(data.entries());
        console.log(formJson);
        action=="Login"?await login(formJson,navigate):await register(formJson);
    
    }
    
    return(
        <div className="full">
    <div className="cont">
        <button className={action==="Login"?"active":""} onClick={() => setaction("Login")}>Login</button>
        <button className={action==="Register"?"active":""} onClick={() => setaction("Register")}>Register</button> 
    </div>
    
    <div className="board">
        <form  onSubmit={submit}>
        {action ==="Register"?
            <div className='reg'>
            <Input  type="text" name='fname' place='First Name' />   
            <Input  type="text" name='lname' place='Last Name' />   

            <Input type="text" name='id' place='Phone' />     
        <Input type='text' name='Consumerid' place="Consumer ID" />
        <Input type='password' name='password' place="Password" />
        <Input type='text' name='cnfrmpassword' place="Confirm Password" />
        </div> :  <div className='log'>
        <Input type='text' name='id' place="Phone" />
        <Input type='password' name='password' place='password'/>
                </div> }
        
        
        
        <button type='submit' id='sub'>Submit</button>
        </form>
        
    </div>
    </div>

   
   
   
)
}








export default Register