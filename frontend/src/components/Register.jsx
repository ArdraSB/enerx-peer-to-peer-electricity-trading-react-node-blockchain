import React, { useState } from 'react';
import './Register.css'
import Input from './Input';
import { Link } from 'react-router-dom';

function Register() {

        
        

    
    const [action,setaction] = useState("Login")
    const Sub =(e) => {
        e.preventDefault()
        const form=e.target
        const data=new FormData(form)
        const formJson= Object.fromEntries(data.entries());
        console.log(formJson);
    }
    return(
        <div className="full">
    <div className="cont">
        <button className={action==="Login"?"active":""} onClick={() => setaction("Login")}>Login</button>
        <button className={action==="Register"?"active":""} onClick={() => setaction("Register")}>Register</button> 
    </div>
    
    <div className="board">
        <form  onSubmit={Sub}>
        {action ==="Register"?
            <div className='reg'>
            <Input  type="text" name='Name' place='Name' />   
            <Input type="tel" name='phone' place='Phone' />     
        <Input type='text' name='ConsumerID' place="Consumer ID" />
        <Input type='password' name='password' place="Password" />
        <Input type='text' name='cnfrmpassword' place="Confirm Password" />
        </div> :  <div className='log'>
        <Input type='tel' name='phone' place="Phone" />
        <Input type='password' name='password' place='password'/>
                </div> }
        
        
        
        <button type='submit' id='sub'><Link to='/Offers'>Submit</Link></button>
        </form>
        
    </div>
    </div>

   
   
   
)
}







export default Register