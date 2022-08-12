
const express=require("express") ;
const app= express();

const mongoose=require("mongoose");
require("dotenv/config");
const bodyParser=require('body-parser');
postRouter=require('./Router/posts');
productRouter  = require('./Router/product');
orderRouter  = require('./Router/order');








 //BodyParser
app.use(bodyParser.json());

//ROUTER

app.use('/posts',postRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);


 app.get("/",(resource,response)=>{

    response.send("Node js server");

    //

 }
 
 );
 

    //connect
mongoose.connect(process.env.DATABASE_URL ,()=>console.log("connected to DB") );




//LISNER

app.listen(8081);





