const express = require("express");
const env = require("dotenv");

env.config();

const app = express();

app.get("/",(req,res) =>{
    res.status(200).send("Hey Neha, I was just joking.")
});

app.listen(process.env.PORT || 4500, () =>{
    console.log("Server Started");
})



