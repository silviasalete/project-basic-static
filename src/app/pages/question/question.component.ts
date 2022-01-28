import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  user: User = {} as User;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.findById(+params['id']);
    })
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
