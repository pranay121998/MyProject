import { Component,  Injectable, OnInit} from '@angular/core';
import { Inject } from '@angular/core';
import { LOGOUT } from '../serverUrls';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
@Injectable()
export class QuizComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.NextQuestion(0);
   
  }
    
  
    //this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
 public questions = [
  {
      question: "How many days makes a week ?",
      optionA: "10 days",
      optionB: "14 days",
      optionC: "5 days",
      optionD: "7 days",
      correctOption: "optionD"
  },

  {
      question: "How many players are allowed on a soccer pitch ?",
      optionA: "10 players",
      optionB: "11 players",
      optionC: "9 players",
      optionD: "12 players",
      correctOption: "optionB"
  },

  {
      question: "Who was the first President of USA ?",
      optionA: "Donald Trump",
      optionB: "Barack Obama",
      optionC: "Abraham Lincoln",
      optionD: "George Washington",
      correctOption: "optionD"
  },

  {
      question: "30 days has ______ ?",
      optionA: "January",
      optionB: "December",
      optionC: "June",
      optionD: "August",
      correctOption: "optionC"
  },

  {
      question: "How manay hours can be found in a day ?",
      optionA: "30 hours",
      optionB: "38 hours",
      optionC: "48 hours",
      optionD: "24 hours",
      correctOption: "optionD"
  },

  {
      question: "Which is the longest river in the world ?",
      optionA: "River Nile",
      optionB: "Long River",
      optionC: "River Niger",
      optionD: "Lake Chad",
      correctOption: "optionA"
  },

  {
      question: "_____ is the hottest Continent on Earth ?",
      optionA: "Oceania",
      optionB: "Antarctica",
      optionC: "Africa",
      optionD: "North America",
      correctOption: "optionC"
  },

  {
      question: "Which country is the largest in the world ?",
      optionA: "Russia",
      optionB: "Canada",
      optionC: "Africa",
      optionD: "Egypt",
      correctOption: "optionA"
  },

  {
      question: "Which of these numbers is an odd number ?",
      optionA: "Ten",
      optionB: "Twelve",
      optionC: "Eight",
      optionD: "Eleven",
      correctOption: "optionD"
  },

  {
      question: `"You Can't see me" is a popular saying by`,
      optionA: "Eminem",
      optionB: "Bill Gates",
      optionC: "Chris Brown",
      optionD: "John Cena",
      correctOption: "optionD"
  },

  {
      question: "Where is the world tallest building located ?",
      optionA: "Africa",
      optionB: "California",
      optionC: "Dubai",
      optionD: "Italy",
      correctOption: "optionC"
  },

  


]


public shuffledQuestions:any = [] //empty array to hold shuffled selected questions out of all available questions
public random:any;

public handleQuestions() { 
  //public to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
  while (this.shuffledQuestions.length <= 9) {
       this.random = this.questions[Math.floor(Math.random() * this.questions.length)]
      if (!this.shuffledQuestions.includes(this.random)) {
          this.shuffledQuestions.push(this.random)
      }
  }
}


public questionNumber:number = 1 //holds the current question number
public playerScore:number = 0  //holds the player score
public wrongAttempt:number = 0 //amount of wrong answers picked by player
public indexNumber:number = 0 //will be used in displaying next question

// public for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
public NextQuestion(index:number) {
  this.handleQuestions()
  const currentQuestion = this.shuffledQuestions[index];
  const questionnumber:any =document.getElementById("question-number")
  const playerscore:any = document.getElementById("player-score")
  const displayquestion:any =  document.getElementById("display-question")
  const optiononelabel:any =document.getElementById("option-one-label")
  const optiontwolabel:any =  document.getElementById("option-two-label")
  const optionthreelabel:any =  document.getElementById("option-three-label")
  const optionfourlabel:any  =  document.getElementById("option-four-label")
  
  questionnumber.innerHTML = this.questionNumber;
  playerscore.innerHTML = this.playerScore
  displayquestion.innerHTML = currentQuestion.question;
  optiononelabel.innerHTML = currentQuestion.optionA;
  optiontwolabel.innerHTML = currentQuestion.optionB;
  optionthreelabel.innerHTML = currentQuestion.optionC;
  optionfourlabel.innerHTML = currentQuestion.optionD;

}


public checkForAnswer() {
  const currentQuestion = this.shuffledQuestions[this.indexNumber] //gets current Question 
  const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
  let options:any = document.getElementsByName("option");
  let correctOption:any = null;
 
  //console.log("label",labels);

 let opt:number;
 let option:any;  

  for( opt=0;option=options[opt]; opt++){
    console.log(option.value);
      if ( option.value=== currentQuestionAnswer) {
          //get's correct's radio input with correct answer
          correctOption = option.labels[0].id;
      }
    }

  //checking to make sure a radio input has been checked or an option being chosen
  if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
    let optionmodal:any=  document.getElementById('option-modal')
    optionmodal.style.display = "flex";
    optionmodal.innerHTML="choose any option";
  }

  //checking if checked radio button is same as answer
  for(let op=0;option=options[op]; op++){
      //  let option:any=options[opt];
   
    if (option.checked === true && option.value === currentQuestionAnswer) {
      let rightColor:any=document.getElementById(correctOption); 
        
      rightColor.style.backgroundColor = "green"
          this.playerScore++ //adding to player's score
          this.indexNumber++ //adding 1 to index so has to display next question..
          //set to delay question number till when next question loads
          setTimeout(() => {
              this.questionNumber++
          }, 1000)
      }

      else if (option.checked && option.value !== currentQuestionAnswer) {
         const wrongLabelId =option.labels[0].id;
          let wrongColor:any=document.getElementById(wrongLabelId)
          let rightColor:any=document.getElementById(correctOption)
          //const wrongLabelId = wrongColor[op].id;
             
          console.log("fasf",option.labels[0].id);
          console.log("colores1",wrongColor);
          console.log("color2",rightColor);

          wrongColor.style.backgroundColor = "red"
          rightColor.style.backgroundColor = "green"
          this.wrongAttempt++ //adds 1 to wrong attempts 
          this.indexNumber++
          //set to delay question number till when next question loads
          setTimeout(() => {
              this.questionNumber++
          }, 1000)
      }
  }
}

  public check(){
    // let checked=document.getElementsByName('option');
    this.checkForAnswer();
  }

//called when the next button is called
public handleNextQuestion() {
  
//   this.checkForAnswer() //check if player picked right or wrong option
  this.unCheckRadioButtons()
  //delays next question displaying for a second just for some effects so questions don't rush in on player
  setTimeout(() => {
      if (this.indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
          this.NextQuestion(this.indexNumber)
      }
      else {
          this.handleEndGame();
        //ends game if index number greater than 9 meaning we're already at the 10th question
      }
      this.resetOptionBackground()
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
 public resetOptionBackground() {
  const options = document.getElementsByName("option");
    let option:any;

    for(var i=0;option=options[i];i++){
      
    const optionId:any= document.getElementById(option.labels[0].id);

     optionId.style.backgroundColor = ""
  }
}


// unchecking all radio buttons for next question(can be done with map or foreach loop also)
// public msg="";
public unCheckRadioButtons() {
  let options:any = document.getElementsByName("option");
  
  for (let i = 0; i < options.length; i++) {
      options[i].checked = false;
      
  }
}

// public for when all questions being answered
  
 public handleEndGame() {
  let remark = ""
  let remarkColor = ""

  let remarks:any=document.getElementById('remarks');
  let remarkscolor:any=document.getElementById('remarks');
  let gradepercentage:any =document.getElementById('grade-percentage')
  let rightanswers:any =document.getElementById('right-answers')
  let wronganswers:any =document.getElementById('wrong-answers')
  // let wronganswersscore:any=document.getElementById('wrong-answers')
  let scoremodal:any =document.getElementById('score-modal');
  // condition check for player remark and remark color
  if (this.playerScore <= 3) {
      remark = "Bad Grades, Keep Practicing."
      remarkColor = "red"
  }
  else if (this.playerScore >= 4 && this.playerScore < 7) {
      remark = "Average Grades, You can do better."
      remarkColor = "orange"
  }
  else if (this.playerScore >= 7) {
      remark = "Excellent, Keep the good work going."
      remarkColor = "green"
  }
  const playerGrade = (this.playerScore / 10) * 100

  //data to display to score board
  remarks.innerHTML = remark
  remarkscolor.style.color = remarkColor
  gradepercentage.innerHTML = playerGrade
  wronganswers.innerHTML = this.wrongAttempt
  rightanswers.innerHTML=this.playerScore;
 
  scoremodal.style.display = "flex"


}

//closes score modal, resets game and reshuffles questions

public closeScoreModal() {
  this.questionNumber = 1
   this.playerScore = 0
  this.wrongAttempt = 0
  this.indexNumber = 0
  this.shuffledQuestions = []
  let scoremodal:any=document.getElementById('score-modal')
  this.NextQuestion(this.indexNumber)
  scoremodal.style.display = "none"
}

//publicto close warning mod
public closeOptionModal() {
  let optionmodal:any=document.getElementById('option-modal')
  optionmodal.style.display = "none"
}

public islogin:any;
public logout(){
  this.http.get(LOGOUT).subscribe((response:any)=>{
   //if(response.status==false){
    this.islogin=false;
  // }
   // this.usertype="";
    //this.router.navigateByUrl("/");
  })

}

public board(){
  this.router.navigateByUrl("/leaderboard");
}

}
