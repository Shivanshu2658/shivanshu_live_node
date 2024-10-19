const mongoose = require('mongoose');


const mongoConnet = async ()=> {
    try{
        await mongoose.connect("mongodb+srv://shivanshuyadav119:shivanshuyadav@dummydb.alhjm24.mongodb.net/");
        console.log("DB connect successful");
    }
    catch(err){
        console.log(`Error : ${err}`);
    }
}

module.exports = mongoConnet;