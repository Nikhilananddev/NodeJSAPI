const express = require('express');
const router=express.Router();
const mongoose=require('mongoose')

const Order =require('../Models/order');

const toid=mongoose.Types.ObjectId


router.get("/", async (request,response)=>{

    try {
        const orders= await Order.find()
        
        response.status(200).json(orders)
    } catch (error) {
        response.status(400).json({message:error})
        
    }
   
    }
    
    );
   
    router.get("/",(resource,response)=>{
   
       response.send("comment");
   
       //
   
      
   
   
    }
    
    );
    router.post('/', async (request,response)=>{


   
           request.body.product=toid(request.body.product);  
           console.log(request.body);
           console.log(request.body.product);
          const order= new Order({
          product:request.body.product,
          quantity:request.body.quantity,
          date:request.body.date
      }
      
      )
   
   
      try {
       const orderSave = await order.save()
       response.status(200).json(orderSave)
   
      } catch (error) {


        console.log(error);
   
          response.status(400).json({message:error})
      }
   
   
   
    }
    
    );
    module.exports=router