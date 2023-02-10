import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BookBindPipe } from './shared/pipes/book-bind.pipe';
import { EditGenreComponent } from './admin/admin-genre-list/edit-genre/edit-genre.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LibraryComponent } from './library/library.component';
import { AdminBookListComponent } from './admin/admin-book-list/admin-book-list.component';
import { AdminAuthorListComponent } from './admin/admin-author-list/admin-author-list.component';
import { AdminPublisherListComponent } from './admin/admin-publisher-list/admin-publisher-list.component';
import { AdminGenreListComponent } from './admin/admin-genre-list/admin-genre-list.component';
import { EditPublisherComponent } from './admin/admin-publisher-list/edit-publisher/edit-publisher.component';
import { EditAuthorComponent } from './admin/admin-author-list/edit-author/edit-author.component';
import { EditBookComponent } from './admin/admin-book-list/edit-book/edit-book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/services/auth.service";
import {AuthInterceptor} from "./shared/auth.interceptor";
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { LibOfUserPipe } from './shared/pipes/lib-of-user.pipe';
import { LibraryStatusPipe } from './shared/pipes/library-status.pipe';
import { ProgressEditComponent } from './library/progress-edit/progress-edit.component';

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
    LibOfUserPipe,
    LibraryStatusPipe,
    ProgressEditComponent
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
