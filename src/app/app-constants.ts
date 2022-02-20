import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export class AppConstants {
  /**
   * Options
   */
  public static get httpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json;charset=utf-8'
      ),
    };
    return httpOptions;
  }

  /**
   * Serve
   */
  public static get baseServe(): string {
    return environment.API;
  }

  /**
   * Authenticate
   */
  public static get baseAuth(): string {
    return this.baseServe + '/auth';
  }

  /**
   * User
   */
  public static get baseUser(): string {
    return this.baseServe + '/user';
  }
  public static get baseUserSave(): string {
    return this.baseUser + '/save/user';
  }
  public static get baseAdminSave(): string {
    return this.baseUser + '/save/admin';
  }
  public static baseUserFindById(id: number): string {
    return this.baseUser + '/' + id;
  }

  /**
   * Country
   */
   public static get baseCountry(): string {
    return 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  }

  /**
   * City
   */
   public static baseCity(acronyms: number): string {
    return `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${acronyms}/municipios`;
    
  }
  
  /**
   * Company
   */
  public static get baseCompany(): string {
    return this.baseServe + '/company';
  }
  public static get baseCompanySave(): string {
    return this.baseCompany + '/save';
  }
  public static get baseCompanyUpdate(): string {
    return this.baseCompany + '/update';
  }
  public static baseCompanyDelete(id: number): string {
    return this.baseCompany + '/' + id;
  }
  public static baseCompanyFindById(id: number): string {
    return this.baseCompany + '/' + id;
  }
  public static baseCompanyPageSort(
    page: number,
    size: number,
    order: string
  ): string {
    return (
      this.baseCompany +
      `?page=${page}&size=${size}&sort=id,${order}&sort=title,asc`
    );
  }

  /**
   * Option
   */
  public static get baseOption(): string {
    return this.baseServe + '/opcao';
  } 
  public static baseCompanyFindByQuestion(question: number): string {
    return this.baseOption + '/' + question;
  }

  /**
   * Answer
   */
  public static get baseAnswerSave(): string{
    return this.baseServe + '/answer/save';
  }

  /**
   * Result
   */
  public static get baseResultSave(): string{
    return this.baseServe + '/result/save';
  }
  public static get baseResult(): string {
    return this.baseServe + '/result';
  }
}
