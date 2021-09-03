//const { db } = require('./DBConnection');
const { db } = require('./DBConnection');
// const signupModel= require('./DBConnection');

var Users=function() 
{
        this.saveUsers=(data,callback)=>
        {
            console.log("data ",data);     
                if(db){
                    db.collection('users').insertOne(data,(err)=>{
                        if(err)
                            callback(false)
                        else
                            callback(true);
                    })

                }else
                    callback(false)
        } 
        
        this.loginUsers = (data,callback)=>
        {
            console.log("data ",data); 
            
                if(db)
                {
                    db.collection('users').findOne(data,(err,record)=>{
                        if(err)
                         callback(false)
                        else
                         callback(record);
                    })
                }else
              callback(false)
        } 
         
}

module.exports=new Users()


 


