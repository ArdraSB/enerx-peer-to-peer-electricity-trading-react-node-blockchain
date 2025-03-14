const check_user=async (pool,id)=>{
    try{
        result=await pool.query("SELECT * FROM USERS WHERE ID=$1",[id])//check user exists
        if (result.rowCount){
            console.log("existing user")
            return 0//if there is rows means existing user 
        }else{
            console.log("new user")
            return 1//if rowCount is 0 means new user
        }

    }catch(err){
        console.log("database error")
        return err//database error
    }
}
module.exports=check_user