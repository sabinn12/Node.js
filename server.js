const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

//routes
app.get('/', (req,res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req,res) => {
    res.send('Hello blogs , my name is irakiza sabin')
})

app.get('/products', async(req,res) =>{
    try{
       const products = await Product.find({});
       res.status(200).json(products);
    }catch (error){
        res.status(500).json({message:error.message})
    }
}) 

app.get('/products/:id',async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


app.post('/products', async(req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);

    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://irakizasabin12:irakizasabin@cluster0.hqk7hht.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, () => {
        console.log('Node api app is running on port 3000')
    })
  
}).catch(() =>{
    console.log(error)
})