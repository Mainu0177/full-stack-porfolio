import mongoose from "mongoose";

const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName: 'PORTFOLIO'
    })
    .then(() =>{
        console.log("Connection to database.");
    })
    .catch((error) =>{
        console.log(`Some Error Occured while Connecting To Database: ${error}`)
    })
}

export default dbConnection;