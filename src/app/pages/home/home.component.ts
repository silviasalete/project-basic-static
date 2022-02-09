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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public companyList: Company[] = [];
  public user: User = {} as User;
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
  
 
  public _currentCountry:Country = {} as Country;
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
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.findUserById(+params['id']);
    });
    this.listarcountrys();    
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

  saveOrUpdate(): void {
    if (this.form.get('id')?.value == null) {      
      const companyForm = {
        nome: this.form.get('nome')?.value,
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
      };
      this.companyService.save(companyForm).subscribe(() => {
        // this.listComapy(this.user.id)
      });
    } else {
      // this.company.id = this.form.get('id')?.value;
      // this.company.title = this.form.get('title')?.value;
      // this.company.description = this.form.get('description')?.value;

      // this.companyService
      //   .update(this.company)
      //   .subscribe(() => this.list(this.user.id));
    }

  // new() {
  //   this.visibleForm = true;
  // }

  // update(id: number) {
  //   this.findById(id);
  //   this.visibleForm = true;
  // }


  }

  // findById(id: number) {
  //   this.companyService.findById(id).subscribe((company: Company) => {
  //     this.form.controls['id'].setValue(company.id);
  //     this.form.controls['title'].setValue(company.title);
  //     this.form.controls['description'].setValue(company.description);
  //   });
  // }

  // delete(id: number) {
  //   this.companyService.delete(id).subscribe(() => this.list(this.user.id));
  // }

  logout() {
    this.authService.logout();
  }
}
