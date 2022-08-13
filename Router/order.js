const express = require('express');
const router=express.Router();
const mongoose=require('mongoose')

const Order =require('../Models/order');

const toid=mongoose.Types.ObjectId
let todayDate=new Date();
let tommorowDate = new Date();
let yesterdayDate = new Date();
tommorowDate.setDate(todayDate.getDate()+1);
yesterdayDate.setDate(todayDate.getDate() - 1);

router.get("/todayTotalRevenue", async (request,response)=>{

    let todayRevenue=0;

    // '$gte': new Date('Thu, 11 Aug 2022 09:19:52 GMT'), 
    // '$lt': new Date('Fri, 12 Aug 2022 09:19:52 GMT')

    console.log(yesterdayDate.toISOString());
    console.log(new Date(tommorowDate).toUTCString());


    const pipeLine=[
      {
        '$lookup': {
          'from': 'products', 
          'localField': 'product', 
          'foreignField': '_id', 
          'as': 'products'
        }
      }, {
        '$match': {
          'date': {
            '$gte': yesterdayDate, 
            '$lt': tommorowDate
          }
        }
      }, {
        '$unwind': {
          'path': '$products'
        }
      }, {
        '$group': {
          '_id': '$products._id', 
          'name': {
            '$first': '$products.name'
          }, 
          'price': {
            '$first': '$products.price'
          }, 
          'quantity': {
            '$first': '$quantity'
          }, 
          'totalAmount': {
            '$sum': {
              '$multiply': [
                '$products.price', '$quantity'
              ]
            }
          }, 
          'totalsold': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'totalsold': -1
        }
      }
    ]



    try {
        const orders= await Order.aggregate(pipeLine);
          await orders.forEach(orderlist=>{
            todayRevenue=todayRevenue+orderlist.totalAmount;
          

          })


        
        response.status(200).json({todayRevenue:todayRevenue,date:new Date()})
    } catch (error) {

        console.log(error);
        response.status(400).json({message:error})
        
    }
   
    }
    
    );
   
    router.get("/topSellingProduct", async (resource,response)=>{
   



    const pipeLine=
    [
      {
        '$lookup': {
          'from': 'products', 
          'localField': 'product', 
          'foreignField': '_id', 
          'as': 'products'
        }
      }, {
        '$unwind': {
          'path': '$products'
        }
      }, {
        '$group': {
          '_id': '$products._id', 
          'name': {
            '$first': '$products.name'
          }, 
          'price': {
            '$first': '$products.price'
          }, 
          'qunatity': {
            '$first': '$quantity'
          }, 
          'totalAmount': {
            '$sum': {
              '$multiply': [
                '$products.price', '$quantity'
              ]
            }
          }, 
          'totalsold': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'totalsold': -1
        }
      }, {
        '$limit': 5
      }
    ]
    
   
      
    try {
        const orders= await Order.aggregate(pipeLine);
        
        response.status(200).json(orders)
    } catch (error) {
        console.log(error);
        response.status(400).json({message:error})
        
    }
   
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

    router.get('/', async (request,response)=>{


   


   try {
     orders = await Order.find().populate("product")
    response.status(200).json(orders)

   } catch (error) {


     console.log(error);

       response.status(400).json({message:error})
   }



 }
 
 );





 module.exports=router