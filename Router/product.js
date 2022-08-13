const express = require('express');
const router=express.Router();
const {Product} =require('../Models/product');



router.get("/", async (request,response)=>{

    try {
        const products= await Product.find();
        
        response.status(200).json(products)
    } catch (error) {
        response.status(400).json({message:error})
        
    }
   
    }
    
    );

    router.post('/', async (request,response)=>{
   
          const product= new Product({
          name:request.body.name,
          description:request.body.description,
          price:request.body.price,
          discount:request.body.discount,
          date:request.body.date
      })
   
   
      try {
       const productSave = await product.save()
       response.status(200).json(productSave)
   
      } catch (error) {


        console.log(error);
   
          response.status(400).json({message:error})
      }
   
   
   
    }
    
    );
    module.exports=router