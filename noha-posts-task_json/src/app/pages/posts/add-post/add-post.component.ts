import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input() post = {
    postName: '',
    postDesc: '',
    postAuthor: '',
    postDate: new Date(),
    post_brief_desc: ''
  };

  constructor(private postServ: PostsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

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
      this.post.postName = form.value.postName;
      this.post.postDesc = form.value.postDesc;
      this.post.postAuthor = form.value.postAuthor;
      this.post.post_brief_desc = form.value.post_brief_desc;

      console.log(this.post.postName);
      console.log(this.post.postDesc);
      console.log(this.post.postAuthor);
      console.log(this.post.postDate);

      this.postServ.addPost(this.post).subscribe((data: any) => {
        localStorage.setItem("post response", data);
        this.router.navigate(['/']);
        this.toastr.success('Sucess!', this.post.postName + ' post is created!');
      })
    }
  }

}
