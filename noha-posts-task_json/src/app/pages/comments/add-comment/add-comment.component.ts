import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() add_comment = {
    commentAuthor: '',
    commentBody: '',
    post_id: '',
    commentDate: new Date()
  };

  post_id = JSON.parse(localStorage.getItem("post details")).id;

  post_name = JSON.parse(localStorage.getItem("post details")).name;


  constructor(private commentService: CommentsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addComment(form: NgForm) {
    if (form.value.commentAuthor === '' || form.value.commentAuthor === null) {
      this.toastr.error('Your name is reqired!', 'Attention!');

    } 
    else if (form.value.commentBody === '' || form.value.commentBody === null) {
      this.toastr.error('The comment is reqired!', 'Attention!');
    }
    else {
      this.add_comment.commentAuthor = form.value.commentAuthor;
      this.add_comment.commentBody = form.value.commentBody;

      console.log(this.add_comment.commentAuthor);
      console.log(this.add_comment.commentBody);
      console.log(this.add_comment.commentDate);
      
      this.commentService.addComment(this.add_comment, this.post_id).subscribe((data: any) => {
        localStorage.setItem("comment response", data);

        this.toastr.success('Sucess!', this.add_comment.commentBody + ' comment is created!');

        this.router.navigate(['/view-post/' + this.post_id]);
      })
    }

  }
}
