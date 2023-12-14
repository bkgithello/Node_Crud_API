const express = require("express");
const app = express();

//routes
app.get('/', (req,res)=>{
    res.send("hello Node Api");
})

app.listen(3000,()=>{
    console.log('Node running on port 3000');
})