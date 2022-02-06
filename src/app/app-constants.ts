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
   * Item
   */
  public static get baseItem(): string {
    return this.baseServe + '/item';
  }
  public static get baseItemSave(): string {
    return this.baseItem + '/save';
  }
  public static get baseItemUpdate(): string {
    return this.baseItem + '/update';
  }
  public static baseItemDelete(id: number): string {
    return this.baseItem + '/' + id;
  }
  public static baseItemFindById(id: number): string {
    return this.baseItem + '/' + id;
  }
  public static baseItemFindAllById(id: number): string {
    return this.baseItem + '/all/' + id;
  }
  public static baseItemPageSort(
    page: number,
    size: number,
    order: string
  ): string {
    return (
      this.baseItem +
      `?page=${page}&size=${size}&sort=id,${order}&sort=title,asc`
    );
  }
}
