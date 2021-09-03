const mongoose=require('mongoose');


    mongoose.connect('mongodb://localhost:27017/quizApp',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("connection sucessful////")})
    .catch((err)=>{console.log(err)})    
   
  const postSchema=mongoose.Schema({
      name:String,
      email:String,
      password:String,
      cpassword:String
  })

module.exports=mongoose.model('users',postSchema);
