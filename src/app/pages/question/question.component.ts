import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnswerCalculated } from 'src/app/models/ansowercalculated';
import { Answer } from 'src/app/models/answer';
import { AnswerByUser } from 'src/app/models/answerbyuser';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user';
import { AnswerService } from 'src/app/service/answer.service';
import { AuthService } from 'src/app/service/auth.service';
import { CompanyService } from 'src/app/service/company.service';
import { OptionService } from 'src/app/service/option.service';
import { ResultService } from 'src/app/service/result.service';
import { UserService } from 'src/app/service/user.service';
import { Area, Option } from '../../models/option';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public arrayAnswer: Answer[] = [];
  public user: User = {} as User;
  public userCompany: string = "";
  public orderOption: number = 1;  
  public allOptions:Option[] = [];
  public optionShow: Option[] = [];

  public executor    : Area = {id: 1, nome: 'Executor', pontos: 0};
  public comunicador : Area = {id: 2, nome: 'Comunicador', pontos: 0};
  public planejador  : Area = {id: 3, nome: 'Planejador', pontos: 0};
  public analista    : Area = {id: 4, nome: 'Analista', pontos: 0};

  public message : string = "";
  public visibleResult: boolean = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private authService: AuthService, private optionService:OptionService, private answerService:AnswerService,  private companyService:CompanyService, private resultService:ResultService) { }

  ngOnInit() {
    this.createArrayAnswer();
    this.getUser();
    this.listAllOptions();
  }
  
  createArrayAnswer(){
    for (let index = 0; index < 24; index++) {
      let answer: Answer = {} as Answer;
      answer.orderTask = (index + 1);
      answer.answered = false;
      this.arrayAnswer[index] = answer;
    }
  }

  getUser(){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.findById(+params['id']);
    });
  }

  listAllOptions() {
    this.optionService.findAll().subscribe(options => {
      this.allOptions = options;      
      this.setOptionShow();
    })
  }

  setOptionShow() {
    this.allOptions.forEach(option => {
      if (option.question === this.orderOption) {
        this.optionShow.push(option);
      }
    });
  }

  respond(evt: Option){
    this.message = "";
    this.updatePageable(this.orderOption, evt);
  }

  updatePageable(orderOption: number,evt: Option) {
    this.arrayAnswer[orderOption-1].user = this.user.id;
    this.arrayAnswer[orderOption-1].answered = true;
    this.arrayAnswer[orderOption-1].nome = evt.nome;
    this.arrayAnswer[orderOption-1].area = evt.area.id;
    console.log("arrayAnswer: ",this.arrayAnswer);    
  }

  calculateArea(idArea: number){
    console.log("idArea: ",idArea);
    
    switch(idArea) { 
      case 1: { 
         this.executor.pontos = (this.executor.pontos + 1);
         break; 
      } 
      case 2: { 
        this.comunicador.pontos = (this.comunicador.pontos + 1);
         break; 
      } 
      case 3: { 
        this.planejador.pontos = (this.planejador.pontos + 1);
         break; 
      } 
      case 4: { 
        this.analista.pontos = (this.analista.pontos + 1);
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   }    
  }

  next(){
    this.message = "";
    if (this.arrayAnswer[this.orderOption-1].answered) {
      this.calculateArea(this.arrayAnswer[this.orderOption-1].area);
      this.orderOption = (this.orderOption + 1);
      this.optionShow = [];
      this.setOptionShow();
    }else{
      this.message = " Você deve responder a pergunta para poder continuar!";
    }
  }

  prev(){
    this.orderOption = (this.orderOption - 1);
    this.optionShow = [];
    this.setOptionShow();
  }

  toFinish(response: number){
    
    if (response === 1) {
      
      let answerByUser: AnswerByUser = {
        id: this.user.id,
        listAnswer: this.arrayAnswer
      }
      
      this.answerService.save(answerByUser).subscribe(response => {
        let answerCalculated:AnswerCalculated = response;

        console.log("answerCalculated: ",answerCalculated);
        this.calculatePercent(answerCalculated);
        this.visibleResult = true;
        // this.logout();
        })
    }else{

    }   
  }

  calculatePercent(answerCalculated:AnswerCalculated){
    this.executor.pontos = +((answerCalculated.pointsAreaExecutor1 * 100)/24).toFixed(2);
    this.comunicador.pontos = +((answerCalculated.pointsAreaComunicador2 * 100)/24).toFixed(2);
    this.planejador.pontos = +((answerCalculated.pointsAreaPlanejador3 * 100)/24).toFixed(2);
    this.analista.pontos = +((answerCalculated.pointsAreaAnalista4 * 100)/24).toFixed(2);

    let result: Result = {
      id: this.user.id,
      company:this.userCompany,
      name: this.user.name,
      email:this.user.email,
      responsed: true,
      userId: this.user.id,
      pointsAreaExecutor1:+((answerCalculated.pointsAreaExecutor1 * 100)/24).toFixed(2),
      pointsAreaComunicador2:+((answerCalculated.pointsAreaComunicador2 * 100)/24).toFixed(2),
      pointsAreaPlanejador3:+((answerCalculated.pointsAreaPlanejador3 * 100)/24).toFixed(2),
      pointsAreaAnalista4:+((answerCalculated.pointsAreaAnalista4 * 100)/24).toFixed(2),
    }

    this.resultService.save(result).subscribe(result => {
      console.log("result:",result);
      
    })


  }

  findById(id: number) {
    this.userService.findUserById(id).subscribe(user => {
      this.user = user;
      this.userCompanyName(user.company);
    })
  }

  logout() {
    this.authService.logout();
  }

  userCompanyName(idUser: number){
    
    this.companyService.findById(idUser).subscribe(company => {
      this.userCompany = company.nome;
    })
  }

}
