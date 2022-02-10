import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { OptionService } from 'src/app/service/option.service';
import { UserService } from 'src/app/service/user.service';
import { Area, Option } from '../../models/option';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  user: User = {} as User;
  public options:Option[] = [];
  public executor : Area = {id: 1, nome: 'Executor', pontos: 0};
  public comunicador : Area = {id: 2, nome: 'Comunicador', pontos: 0};
  public planejador : Area = {id: 3, nome: 'Planejador', pontos: 0};
  public analista: Area = {id: 4, nome: 'Analista', pontos: 0};
  public numberQuestion: number = 1;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private authService: AuthService, private optionService:OptionService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.findById(+params['id']);
      // this.findByQuestion(this.numberQuestion);
      this.listAll();
    })
  }
  listAll() {
    this.optionService.findAll().subscribe(options => {
      this.options = options;
      console.log("this.options: ",this.options);
    })
  }

  findByQuestion(question: number) {
    this.optionService.findByQuestion(question).subscribe(options => {
      this.options = options;

      
    })
  }
  responde(evt: Option){
    console.log("CLICOU");
    console.log("evt:",evt);
    
  // public executor : Area = {id: 1, nome: 'Executor', pontos: 0};
  // public comunicador : Area = {id: 2, nome: 'Comunicador', pontos: 0};
  // public planejador : Area = {id: 3, nome: 'Planejador', pontos: 0};
  // public analista: Area = {id: 4, nome: 'Analista', pontos: 0};
    switch(evt.area.id) { 
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
   console.log(" this.executor.pontos: ", this.executor.pontos);
   console.log(" this.comunicador.pontos: ", this.comunicador.pontos);
   console.log(" this.planejador.pontos: ", this.planejador.pontos);
   console.log(" this.analista.pontos: ", this.analista.pontos);

  }
  findById(id: number) {
    this.userService.findUserById(id).subscribe(user => {
      this.user = user;
    })
  }

  logout() {
    this.authService.logout();
  }
}
