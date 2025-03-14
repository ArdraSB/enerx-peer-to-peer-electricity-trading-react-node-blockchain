const express=require("express")
const cors=require("cors")
const pool=require("./db")
const client=require("./twilio_client")
const app=express()
const check_user=require("./components/check_user")

//middlewares
app.use(express.json())
app.use(cors())

//start server
app.listen(3000,()=>{
    console.log("server listening at port 3000...")
})

//apis

//1.sendotp
app.post("/user/sendotp",async (req,res)=>{
    const {id}=req.body
    // try{
    //     result=await pool.query("SELECT * FROM USERS WHERE ID=$1",[id])//check user exists

    // }catch(err){
    //     console.log("database error")
    //     res.json(err)
    // }
    x=await check_user(pool,id)
    if (x==1){//new user
        console.log("new user")
        console.log(result)
        const otp = Math.floor(9100000 + Math.random() * 900000).toString();
        console.log(otp)
        console.log(id)
        try {
            // await client.messages.create({
            //     body: `Your OTP is ${otp}`,
            //     from: "+15013007976",
            //     to: id
            // });
            pool.query("INSERT INTO ")
            console.log("message sent");

            res.json({ message: "OTP sent successfully" });
        } catch (err) {
            res.status(500).json({ error: "Failed to send OTP",reason:err });
        }

    }
    else{//user already exists
        res.status(403).send("user already registered")
    }
})
