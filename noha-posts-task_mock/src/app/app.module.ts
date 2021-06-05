import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './services/posts.service';
import { AddPostComponent } from './pages/posts/add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './pages/posts/edit-post/edit-post.component';
import { PostDetailsComponent } from './pages/posts/post-details/post-details.component';
import { CommentsService } from './services/comments.service';
import { CommentsComponent } from './pages/comments/comments.component';
import { AddCommentComponent } from './pages/comments/add-comment/add-comment.component';
import { EditCommentComponent } from './pages/comments/edit-comment/edit-comment.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    AddPostComponent,
    EditPostComponent,
    PostDetailsComponent,
    CommentsComponent,
    AddCommentComponent,
    EditCommentComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000
    }), // ToastrModule added
  ],
  providers: [PostsService,CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
