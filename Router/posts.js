const express=require("express");
const router=express.Router();
const Post=require('../Models/post')

router.get("/", async (request,response)=>{

 try {
     const posts= await Post.find();
     
     response.status(200).json(posts)
 } catch (error) {
     response.status(400).json({message:error})
     
 }
     
   


 }
 
 );


 router.post('/', async (request,response)=>{

  
// console.log(resource.body);
   const post= new Post({
       title:request.body.title,
       description:request.body.description,
       date:request.body.date
   })


   try {
    const postSave = await post.save()
response.status(200).json(postSave)

   } catch (error) {

    console.log(error);
       response.status(400).json({message:error})
   }



 }
 
 );
 module.exports=router