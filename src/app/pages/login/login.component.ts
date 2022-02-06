import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Decode } from 'src/app/models/decode';
import { Token } from 'src/app/models/token.entities';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) =>
      this.form.controls['email'].setValue(params['email'])
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.user.email = this.form.get('email')?.value;
      this.user.password = this.form.get('password')?.value;
      this.userService.login(this.user).subscribe((token: Token) => {
        window.localStorage.setItem('token', token.token);
        const decoded: Decode = jwtDecode(token.token);
        if(decoded.roles[0].authority == 'admin'){
          this.router.navigate(['/home', decoded.id]);
        }else{
          this.router.navigate(['/question', decoded.id]);
        }
      });

      this.form.reset();
    }
  }
}
