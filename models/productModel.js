const mongoose = require('mongoose')
const blogSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "please enter a blog name"]
        },
     
        age: {
         type: Number,
         required: true,
         default: 0
        },
     
        image: {
            type: String,
            required: false,
        }
    },
    {
        
        timestamps: true
    }
)


const Blog = mongoose.model('Blog',blogSchema);  


module.exports = Blog;
