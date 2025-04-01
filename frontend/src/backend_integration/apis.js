import axios from 'axios'
import { getAddress } from './smart_contract_calls';


let userdata;
let privateKey;
let publicKey;
const Server="http://localhost:3000";
const register=async (formJson) => {
   
    try{
    const response=await axios.post(`${Server}/user/register`,formJson)
    if(response.status===200 ){
        console.log("User registered successfully");
        alert("user registered succesfully");
    }
    }catch(err){
            if(err.response && err.response.status===403 ){
                alert("user already registered");
            }
        
        else{
            alert(err)
        }
        
    }
    
}
const login=async (formJson,navigate) => {
    
   
    try{
    const response=await axios.post(`${Server}/user/login`,formJson)
    console.log(response)
    if(response.status===200 ){
        userdata=response.data
        console.log(userdata.walletid);
        privateKey=userdata.walletid==null?"":userdata.walletid;
        publicKey=await getAddress();
        navigate('/Offers')
        console.log("Login successfull");
    }
    }catch(err){
        if(err.response && err.response.status===403 ){
            alert("login failed")
        }
        
        else{
            alert(err)
        }
        
    }
    
}
//to add meterid
const saveMeter=async (data)=>{
    try{
        const response=await axios.post(`${Server}/user/savemeter`,data)
        console.log(response)
        if(response.status===200 ){
            alert("smart meter linked")
            console.log(data,"smart meter linked");
        }
        }catch(err){
            if(err.response){
                alert("smart meter linking failed!")
            }
            
            else{
                alert(err)
            }
            
        }
    }

//to add walletid
const saveWallet=async (data)=>{
    try{
        const response=await axios.post(`${Server}/user/saveWallet`,data)
        console.log(response)
        if(response.status===200 ){
            alert("wallet linked")
            console.log(data,"wallet linked");
        }
        }catch(err){
            if(err.response){
                alert("wallet linking failed!")
            }
            
            else{
                alert(err)
            }
            
        }
 }
export {login,register,userdata,saveMeter,saveWallet,privateKey,publicKey}//named exports