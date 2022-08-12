const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
 
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    


})


const Product=mongoose.model('Product',productSchema);

module.exports={Product,productSchema}