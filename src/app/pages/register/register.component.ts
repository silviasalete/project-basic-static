import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private user: User = {} as User;
  private typeRegister: string = "";

  form: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control(null, Validators.required),
    email: this.formBuilder.control(null, Validators.required),
    password: this.formBuilder.control(null, Validators.required),
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {    
    this.activatedRoute.params.subscribe((params: Params) => this.typeRegister = params['type']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.createAccount(this.form.value,this.typeRegister).subscribe((response) => {
        this.form.reset();
        this.router.navigate(['/login', response.email]);
      });
    }
  }
}
