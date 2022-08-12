const mongoose=require('mongoose')
const {productSchema,Product}=require('./product')


// const product = await Product.create({
//     product: "product"
// });

const orderSchema=mongoose.Schema({
 
    product:{
        type:mongoose.Types.ObjectId,ref:"Product",
       
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    


})



module.exports=mongoose.model('order',orderSchema);