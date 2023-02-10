import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "../admin/admin.component";
import {LibraryComponent} from "../library/library.component";
import {AdminBookListComponent} from "../admin/admin-book-list/admin-book-list.component";
import {AdminAuthorListComponent} from "../admin/admin-author-list/admin-author-list.component";
import {AdminPublisherListComponent} from "../admin/admin-publisher-list/admin-publisher-list.component";
import {AdminGenreListComponent} from "../admin/admin-genre-list/admin-genre-list.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {BooksComponent} from "../books/books.component";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {AdminUserListComponent} from "../admin/admin-user-list/admin-user-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksComponent},
  {path: 'book/:isbn',component: BookDetailsComponent},
  {path: 'library', component: LibraryComponent},
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: '', redirectTo: 'books', pathMatch: 'full'},
      {path: 'books', component: AdminBookListComponent},
      {path: 'authors', component: AdminAuthorListComponent},
      {path: 'publishers', component: AdminPublisherListComponent},
      {path: 'genres', component: AdminGenreListComponent},
      {path: 'users', component: AdminUserListComponent}
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
