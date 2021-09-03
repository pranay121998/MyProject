import { Component, OnInit } from '@angular/core';
import { USER_LOGIN, USER_REGISTER } from '../serverUrls';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  public evt1=false;
  public evt2=true;
   public loginMsg="";
   public regMsg="";
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  this.evt1=false;
    this.evt2=true;
  
  }

  public linkRegister(){
    this.evt2=false;
    this.evt1=true;
  }   
  
  public linkLogin(){
    this.evt1=false;
    this.evt2=true;
  }

  public register(rdata:any){
    console.log("register ",rdata);
    if(rdata.password===rdata.cpassword){
    this.http.post(USER_REGISTER,rdata).subscribe((response:any)=>{
         if(response.status)
            this.regMsg="Registeration Success !";
          else
          this.regMsg="Registration Failed !";
    });
  }else
      this.regMsg="Enter password again";

  }

  public isLogin=false;

 public login(ldata:any){
    console.log("login",ldata);
    console.log("http",this.http.post(USER_LOGIN,ldata));
    this.http.post(USER_LOGIN,ldata).subscribe((response:any)=>{
               console.log('ajfjs',response)
        if(response.status){
          this.isLogin=true;
           this.loginMsg="Login Success ! ";
           //console.log(this.returnUrl);
                this.router.navigateByUrl("/quiz");
          }
           else
           this.loginMsg="Login Failed !";
    })
  }


}
