import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BookBindPipe } from './book-bind.pipe';
import { EditGenreComponent } from './edit-genre/edit-genre.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LibraryComponent } from './library/library.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AdminAuthorListComponent } from './admin-author-list/admin-author-list.component';
import { AdminPublisherListComponent } from './admin-publisher-list/admin-publisher-list.component';
import { AdminGenreListComponent } from './admin-genre-list/admin-genre-list.component';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./auth.service";
import {AuthInterceptor} from "./auth.interceptor";
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { LibOfUserPipe } from './lib-of-user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BookBindPipe,
    EditGenreComponent,
    LibraryComponent,
    AdminBookListComponent,
    AdminAuthorListComponent,
    AdminPublisherListComponent,
    AdminGenreListComponent,
    EditPublisherComponent,
    EditAuthorComponent,
    EditBookComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    BookDetailsComponent,
    LibOfUserPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
