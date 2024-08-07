const mongoose = require('mongoose');


const mongoConnet = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connect successful");
    }
    catch(err){
        console.log(`Error : ${err}`);
    }
}

module.exports = mongoConnet;