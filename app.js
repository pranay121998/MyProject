const express=require("express");
const path = require("path");
const cookieParser= require("cookie-parser");
const expressSession=require("express-session");
// const fileUpload=require("express-fileupload");
 const cors=require("cors");
const server =express();

const userRouter=require('./server/router/UserRouter');
// const adminRouter = require("./server/router/AdminRouter");
// const userRouter=require("./server/router/UserRouter");

server.use(cors());
server.use(express.static(path.join(__dirname,"dist/Quiz-Web-App")))
server.use(express.json());

// server.use()
// server.use("/quiz",)
server.use(cookieParser());
// server.use(fileUpload());
server.use(expressSession({secret:"pranay",resave:true,saveUninitialized:true}));
// server.use("/admin",adminRouter);
// server.use("/user",userRouter);
server.use("/user",userRouter);
server.get("/checksession",(request,response)=>{
    console.log("seddong",request.session);
    if(request.session.users==undefined)
        response.send({status:false})
        else
        response.send({status:true,name:request.session.users.name})
});

server.get("/logout",(request,response)=>{
      request.session.destroy();
      response.send({status:true})

})

server.listen(8000,()=>{
    console.log("server : http://localhost:8000");
});