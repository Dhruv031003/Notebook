const connectToMongo=require('./db');
const express=require('express');
var cors = require('cors')

const app=express();
const port=80;

connectToMongo();

app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log(`you are connected on port: ${port}`)
})