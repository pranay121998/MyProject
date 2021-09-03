import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CHECK_SESSION } from './serverUrls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz-Web-App';
     
  public islogin:any;
  public usertype:any;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
   // console.log("Constructor",this.http);
    setInterval(()=>{

      this.http.get(CHECK_SESSION).subscribe((response:any)=>{
        this.islogin=response.status;

        console.log("app",response.status);
        // if(this.islogin){
        //    this.usertype=response.info;
          
        // }
      })
    },1000)
  }


}
