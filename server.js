const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/productModel')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
mongoose.connect("mongodb://localhost/crudAPI").then(() =>{
    console.log("Connected to MongoDB");
    app.listen(3000,()=>{
        console.log('Node running on port 3000');
    })
}).catch((err)=>{
    console.log(err);
})

//routes
app.get('/', (req,res)=>{
    res.send("hello Node Api");
})
app.get('/products',async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch{
        res.status(500).json({message:error.message});
    }
})

app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with Id ${id}`});
        }
            const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);    
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})



app.get('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

app.post('/product',async(req,res)=>{
  try{
    const product = await Product.create(req.body);
    res.status(200).json(product);
  }catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
  }
})

app.delete('/product/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`});
        }
        res.status(500).json({product});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})