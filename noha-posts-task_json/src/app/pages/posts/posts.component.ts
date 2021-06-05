import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any= [];

  constructor(private postService:PostsService,private toastr: ToastrService) { }

  ngOnInit() {

    this.postService.getPosts().subscribe((data:any)=>{
      localStorage.setItem('posts', JSON.stringify(data));
this.posts = JSON.parse(localStorage.getItem("posts"))
    })
       
}

onClick(post){
  localStorage.setItem('post details', JSON.stringify(post));
}

delete(id,name){
  console.log(id)
  if(window.confirm('Are you sure you want to delete ' + name + ' ?' )) {
  this.postService.deletePost(id).subscribe((data:any)=>{
    console.log(data);
    this.toastr.success('Sucess!',name + ' is deleted!');
        location.reload();

  })
}
}

}
