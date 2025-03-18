import axios from 'axios'


const Server="http://localhost:3000";
const register=async (formJson) => {
    let response;
    try{
    response=await axios.post(`${Server}/user/register`,formJson)
    if(response.status===200 ){
        console.log("User registered successfully");
    }
    }catch(err){
            if(err.response && err.response.status===403 ){
                alert("user already registered")
            }
        
        else{
            alert(err)
        }
        
    }
    
}
const login=async (formJson,navigate) => {
    
    let response;
    try{
    response=await axios.post(`${Server}/user/login`,formJson)
    console.log(response)
    if(response.status===200 ){
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
export {login,register}//named exports