import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {LibraryComponent} from "./library/library.component";
import {AdminBookListComponent} from "./admin-book-list/admin-book-list.component";
import {AdminAuthorListComponent} from "./admin-author-list/admin-author-list.component";
import {AdminPublisherListComponent} from "./admin-publisher-list/admin-publisher-list.component";
import {AdminGenreListComponent} from "./admin-genre-list/admin-genre-list.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', redirectTo: 'library', pathMatch: 'full'},
  {path: 'library', component: LibraryComponent},
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: '', redirectTo: 'books', pathMatch: 'full'},
      {path: 'books', component: AdminBookListComponent},
      {path: 'authors', component: AdminAuthorListComponent},
      {path: 'publishers', component: AdminPublisherListComponent},
      {path: 'genres', component: AdminGenreListComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
