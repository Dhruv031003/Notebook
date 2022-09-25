const mongoose=require('mongoose')
const mongoURI="mongodb+srv://Dhruvdorbi:Dhruv031003@notebook.u70jc2a.mongodb.net/notebook?retryWrites=true&w=majority"

const connectToMongo= ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose succesfully");
    })
}

module.exports= connectToMongo;