const express=require("express")
const cors=require("cors")
const pool=require("./db")
const app=express()
const check_user=require("./components/check_user")

//middlewares
app.use(express.json())
app.use(cors())

//start server
app.listen(3000,()=>{
    console.log("server listening at port 3000...")
})

//routes
app.post("/user/register", async (req, res) => {
    const {id, fname, lname, password} = req.body;
    try{
        if (await check_user(pool, id) == 0) {
            throw 1;
        }
        await pool.query("insert into users (id, firstname, lastname, password) values ($1, $2, $3, $4)", [id, fname, lname, password]);
        res.status(201).json({ message: "user registered successfully" });

    }catch (err) {
        if (err==1){
            res.status(403).json({ message: "user already registered" });
        }else{
        res.status(500).json({ error: "failed to register user", reason: err.message });
        }
    }
});

app.get("/user/login", async (req, res) => {
    const {id, password} = req.body;
    try {
        const result = await pool.query("select * from users where id = $1 and password = $2", [id, password]);
        if (result.rowCount) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(403).json({ message: "login failed" });
        }
    } catch (err) {
        res.status(500).json({ error: "failed to login", reason: err.message });
    }
});
app.delete("/user/delete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query("delete from users where id = $1", [id]);
        if (result.rowCount) {
            res.status(200).json({ message: "user deleted successfully" });
        } else {
            res.status(403).json({ message: "user not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "failed to delete user", reason: err.message });
    }
});