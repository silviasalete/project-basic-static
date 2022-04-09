import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/service/company.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private user: User = {} as User;
  public typeRegister: string = "";
  public companies:Company[] = [];
  public visibleSelectCompany: Boolean = false;
  public blockScreen: boolean = true;
  public keyWord: string = "";

  unlockForm: FormGroup = this.formBuilder.group({
    keyWord: this.formBuilder.control(null, Validators.required)
  });

  form: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control(null, Validators.required),
    email: this.formBuilder.control(null, Validators.required),
    password: this.formBuilder.control(null, Validators.required),
    company: this.formBuilder.control(null, null),
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
  ) {}

  ngOnInit() {    
    this.activatedRoute.params.subscribe((params: Params) => {
      this.typeRegister = params['type'];
        if (this.typeRegister == 'user') {
          this.visibleSelectCompany = true;
          this.blockScreen = false;
        }
      this.listCompanies();
    });
  }

  listCompanies() {
    this.companyService.findAll().subscribe(companies => {
      this.companies = companies;
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.createAccount(this.form.value,this.typeRegister).subscribe((response) => {
        this.form.reset();
        this.router.navigate(['/login', response.email]);
      });
    }
  }
  unLock(){
    if (this.unlockForm.get('keyWord')?.value == 'horta-admin') {
      this.blockScreen = false;
    }
    
  }
}
