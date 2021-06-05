import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() post = {
    id: '',
    postName: '',
    postDesc: '',
    postAuthor: '',
    postDate: new Date(),
    post_brief_desc: ''
  };

  postList = JSON.parse(localStorage.getItem('post details'));


  constructor(private postServ: PostsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.post.postName = this.postList.post_name;
    this.post.postDesc = this.postList.post_description;
    this.post.postAuthor = this.postList.post_author;
    this.post.post_brief_desc = this.postList.post_breif_description;
  }

  onSubmit(form: NgForm) {
    if (form.value.postName === '' || form.value.postName === null) {
      this.toastr.error('The post name is reqired!', 'Attention!');
    }
    else if (form.value.postDesc === '' || form.value.postDesc === null) {
      this.toastr.error('The post description is reqired!', 'Attention!');
    }
    else if (form.value.postAuthor === '' || form.value.postAuthor === null) {
      this.toastr.error('Your name is reqired!', 'Attention!');
    }
    else if (form.value.post_brief_desc === '' || form.value.post_brief_desc === null) {
      this.toastr.error('The post breif description is reqired!', 'Attention!');
    }
    else {
      this.post.id = this.postList.id;
      this.post.postName = form.value.postName;
      this.post.postDesc = form.value.postDesc;
      this.post.post_brief_desc = form.value.post_brief_desc
      this.post.postAuthor = form.value.postAuthor;

      console.log(this.post.id);
      console.log(this.post.postName);
      console.log(this.post.postDesc);
      console.log(this.post.postAuthor);
      console.log(this.post.postDate);

      this.postServ.editPost(this.post).subscribe((data: any) => {
        localStorage.setItem("post response", data);
        this.router.navigate(['/']);
        this.toastr.success('Sucess!', this.post.postName + ' post is edited!');

      })
    }
  }



}
