import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token.entities';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private user: User = {} as User;

  form: FormGroup = this.formBuilder.group({
    email: this.formBuilder.control(null, Validators.required),
    password: this.formBuilder.control(null, Validators.required),
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    if (this.form.valid) {
      this.user.email = this.form.get('email')?.value;
      this.user.password = this.form.get('password')?.value;
      this.userService.login(this.user).subscribe((token: Token) => {
        window.localStorage.setItem('token', token.token);
        console.log('Usuário Logado: ', token);
        this.router.navigate(['home']);
      });

      this.form.reset();
    }
  }
}
