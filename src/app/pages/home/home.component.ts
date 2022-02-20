import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { CountryService } from 'src/app/service/countryservice';
import { CompanyService } from 'src/app/service/company.service';
import { UserService } from 'src/app/service/user.service';
import { UserView } from 'src/app/models/user-view';
import { Result } from 'src/app/models/result';
import { ResultService } from 'src/app/service/result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public companyList: Company[] = [];
  public user: User = {} as User;
  public userList: UserView[] = [];

  form: FormGroup = this.formBuilder.group({
    id: this.formBuilder.control(null, null),
    nome: this.formBuilder.control(null, Validators.required),
    country: this.formBuilder.control(null, Validators.required),
    city: this.formBuilder.control(null, Validators.required),
  });
  public visibleForm: boolean = false;
  public visibleCities: boolean = false;
  public countries: Country[] = [];
  public cities: City[] = [];
  public listComapy: Company[] = [];
  public listResult: Result[] = [];
  public visibleButtonSave: Boolean = true;
  public visibleButtonUpdate: Boolean = false;
 
  public _currentCountry:Country = {} as Country;
  public companies: Company[] = [];
  public get currentCountry(): Country {
    return this._currentCountry;
  }
  public set currentCountry(value: any) {   
    this.listCities(value);
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private companyService: CompanyService,
    private resultService: ResultService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.findUserById(+params['id']);
    });
    this.listarcountrys();   
    this.listCompanies(); 
    this.listAllUser();
    this.listAllResult()
  }

  findUserById(id: number) {
    this.userService.findUserById(id).subscribe((data) => {
      this.user = data;
    });
  }

  listarcountrys() {
    this.countryService.listCounties().subscribe((countries) =>{
      this.countries = countries;
    })
  }
 
  listCities(acronyms: number) {
    this.countryService.listCities(acronyms).subscribe((cities) =>{
      this.cities = cities;
    })
  }

  listCompanies(){
      this.companyService.findAll().subscribe((companies) => {
        this.companies = companies;
      })
  }
  saveOrUpdate(): void {
    if (this.form.get('id')?.value == null) {      
      console.log("SALVAR");
      
      const companyForm = {
        nome: this.form.get('nome')?.value,
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
      };
      this.companyService.save(companyForm).subscribe(() => {
      this.listCompanies(); 
      });
    } else {
      console.log("ALTERAR");

      const companyForm = {
        id: this.form.get('id')?.value,
        nome: this.form.get('nome')?.value,
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
      };
      this.companyService.save(companyForm).subscribe(() =>this.listCompanies());
    }
  }
  // new() {
  //   this.visibleForm = true;
  // }

  update(id: number) {
    this.findById(id);
  }

  findById(id: number) {
    this.companyService.findById(id).subscribe((company: Company) => {
      this.form.controls['id'].setValue(company.id);
      this.form.controls['nome'].setValue(company.nome);
      this.form.controls['country'].setValue(company.country);
      this.form.controls['city'].setValue(company.city);
      this.visibleButtonSave = false;
      this.visibleButtonUpdate = true;
    });
  }

  delete(id: number) {
    console.log("Apagar: ",id);    
    this.companyService.delete(id).subscribe(() => this.listCompanies());
  }

  logout() {
    this.authService.logout();
  }

  listAllUser(){
    console.log("listAllUser:");
    this.userService.findAllUser().subscribe(userViews => {
      // element.roles[0].name == "admin"?"Administrador":"Usuário"
      console.log("userViews:",userViews);
      
      this.userList = userViews;     
    })
      
  }
  findByIDComapany(companyId: number):string{
    let companyName = "";

    this.companyService.findById(companyId).subscribe(company => {
      if (company) {
        companyName = company.nome;
      }
    });
    
    return companyName;
  }

  listAllResult(){
    this.resultService.findAll().subscribe(results => {
      this.listResult = results;
    })
      
  }
}
