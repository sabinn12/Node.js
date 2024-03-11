const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/productModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Route for getting all blogs
app.get('/blogs', async(req,res) =>{
    try{
       const blogs = await Blog.find({});
       res.status(200).json(blogs);
    }catch (error){
        res.status(500).json({message:error.message})
    }
}) 

// Route for getting a specific blog by ID
app.get('/blogs/:id',async(req,res) =>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// Route for creating a new blog
app.post('/blogs', async(req,res) => {
    try{
        const blog = await Blog.create(req.body)
        res.status(200).json(blog);

    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// Route for updating a specific blog by ID
app.put('/blogs/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);
        if(!blog){
            return res.status(404).json({message: `cannot find any blog with Id ${id}`})
        }
        const updatedBlog = await Blog.findById(id);
        res.status(200).json(updatedBlog)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Route for deleting a specific blog by ID
app.delete('/blogs/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({messsage: `cannot find any blog with ID ${id}`})
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Connecting to MongoDB and starting the server
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
