import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Item } from 'src/app/models/item';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { ItemService } from 'src/app/service/item.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private item: Item = {} as Item;
  public itemList: Item[] = [];
  public user: User = {} as User;
  form: FormGroup = this.formBuilder.group({
    id: this.formBuilder.control(null, null),
    title: this.formBuilder.control(null, Validators.required),
    description: this.formBuilder.control(null, Validators.required),
  });
  visibleForm: boolean = false;
  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.findUserById(+params['id']);
      this.list(+params['id']);
    });
  }

  findUserById(id: number) {
    this.userService.findUserById(id).subscribe((data) => {
      this.user = data;
    });
  }

  new() {
    this.visibleForm = true;
  }

  update(id: number) {
    this.findById(id);
    this.visibleForm = true;
  }

  list(id: number) {
    this.itemService.list(id).subscribe((data) => {
      this.itemList = data;
    });
  }

  saveOrUpdate(): void {
    if (this.form.get('id')?.value == null) {
      const itemForm = {
        idUser: this.user.id,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
      };
      this.itemService.save(itemForm).subscribe(() => this.list(this.user.id));
    } else {
      this.item.id = this.form.get('id')?.value;
      this.item.title = this.form.get('title')?.value;
      this.item.description = this.form.get('description')?.value;

      this.itemService
        .update(this.item)
        .subscribe(() => this.list(this.user.id));
    }
  }

  findById(id: number) {
    this.itemService.findById(id).subscribe((item: Item) => {
      this.form.controls['id'].setValue(item.id);
      this.form.controls['title'].setValue(item.title);
      this.form.controls['description'].setValue(item.description);
    });
  }

  delete(id: number) {
    this.itemService.delete(id).subscribe(() => this.list(this.user.id));
  }

  logout() {
    this.authService.logout();
  }
}
