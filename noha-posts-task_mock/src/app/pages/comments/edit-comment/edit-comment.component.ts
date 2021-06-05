import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {


  @Input() comment = {
    id: '',
    commentAuthor: '',
    commentBody: '',
    commentDate: new Date()
  };

  comment_details = JSON.parse(localStorage.getItem('comment details'));

  post_id = JSON.parse(localStorage.getItem('post details')).id;

  post_name = JSON.parse(localStorage.getItem("post details")).post_name;

  constructor(private commentServ: CommentsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.comment.commentAuthor = this.comment_details.author;
    this.comment.commentBody = this.comment_details.body;
  }


  editComment(form: NgForm) {
    if (form.value.commentAuthor === '' || form.value.commentAuthor === null) {
      this.toastr.error('Your name is reqired!', 'Attention!');

    } 
    else if (form.value.commentBody === '' || form.value.commentBody === null) {
      this.toastr.error('The comment is reqired!', 'Attention!');
    }
    else {
      this.comment.id = this.comment_details.id;
      this.comment.commentAuthor = form.value.commentAuthor;
      this.comment.commentBody = form.value.commentBody;

      console.log(this.comment.commentAuthor);
      console.log(this.comment.commentBody);
      console.log(this.comment_details.id);
      console.log(this.comment.commentDate);

      this.commentServ.editComment(this.comment, this.post_id).subscribe((data: any) => {
        localStorage.setItem("comment response", data);
        this.router.navigate(['/view-post/' + this.post_id]);
        this.toastr.success('Sucess!', this.comment.commentBody + ' comment is edited!');
      })

    }
  }
}
