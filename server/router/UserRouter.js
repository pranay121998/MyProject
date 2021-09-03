const express=require('express');
const path=require('path');
const userData=require('../model/UserModel');

const router=express.Router();

router.post('/register',(request,response)=>{
      console.log("userData",request.body);
          userData.saveUsers(request.body,(record)=>{
             
              console.log(record);
              console.log("dsdsda",request.body);
              response.send({status:record});
          });
        
     })
     

router.post('/login',(request,response)=>{
        console.log("login",request.session);
        
             userData.loginUsers(request.body,(record)=>{
                console.log('fdslkadsk ',record)
                
                if(record){
                  request.session.users ={
                      type:"user",
                      name:record.name,
                      email:record.email
                  }
                  response.send({status:true});
              }else{
                response.send({status:false});   
              }
      
             })
         
  });     

module.exports=router; 