const express = require("express");
const env = require("dotenv");
const mongoConnet = require("./config/db");
const userRoutes  = require("./routes/userRoutes");




env.config();

mongoConnet();

const app = express();

app.use('/api/v1/user', userRoutes);

app.get("/",(req,res) =>{
    res.status(200).send("ihfaisdfguhiasdhia")
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


