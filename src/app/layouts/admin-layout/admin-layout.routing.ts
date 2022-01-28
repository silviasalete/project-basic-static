import { HomeComponent } from './../../pages/home/home.component';
import { Routes } from '@angular/router';
import { QuestionComponent } from 'src/app/pages/question/question.component';

export const AdminLayoutRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'question/:id', component: QuestionComponent },
];
