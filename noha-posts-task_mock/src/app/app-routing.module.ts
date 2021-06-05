import { Component, NgModule } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AddCommentComponent } from './pages/comments/add-comment/add-comment.component';
import { EditCommentComponent } from './pages/comments/edit-comment/edit-comment.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddPostComponent } from './pages/posts/add-post/add-post.component';
import { EditPostComponent } from './pages/posts/edit-post/edit-post.component';
import { PostDetailsComponent } from './pages/posts/post-details/post-details.component';
import { PostsComponent } from './pages/posts/posts.component';


const routes: Routes = [
  {path:"",component:PostsComponent},
  {path:"add-post",component:AddPostComponent},
  {path:"edit-post/:id",component:EditPostComponent},
  {path:"view-post/:id",component:PostDetailsComponent},
  {path:"add-comment",component:AddCommentComponent},
  {path:"edit-comment/:id",component:EditCommentComponent},
  {path:"about-us",component:AboutComponent},
  {path:"contact-us",component:ContactComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
