import express from "express";
import cors from "cors";


var mysql = require('mysql');

var con = mysql.createConnection({
    user: "root",
    password: "password",
    database: "react-jukebox"
});
  
con.connect(function(err: Error) {
  if (err) throw err;
  console.log("Connected!");
});



const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/test", async (req, res) => {
    res.json({ message: "success!" });
});

app.get("/api/testdata", async (req, res) => {
    const q = "SELECT * FROM users";
    con.query(q,(err:Error,data:JSON)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.listen(5000, () => {
    console.log("server running on port 5000");
});