const express = require("express");
const env = require("dotenv");
const mongoConnet = require("./config/db");
const authRoutes  = require("./routes/authRoutes");

env.config();

mongoConnet();

const app = express();

app.use(express.json())

app.use('/api/v1/auth', authRoutes);

app.get("/",(req,res) =>{
    res.status(200).send("Checking the first deployment")
});



app.listen(process.env.PORT || 4500, () =>{
    console.log("Server Started");
})






// firstName
// "Jamaal"
// lastName
// "Kobes"
// email
// "jkobesi@macromedia.com"
// jobTitle
// "Clinical Specialist"
// gender
// "Male"


