import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  post_id = '';
  comments: any = [];

  @Input() add_comment = {
    commentAuthor: '',
    commentBody: '',
    post_id: '',
    commentDate: new Date()
  };
  constructor(private commentService: CommentsService, private toastr: ToastrService) { }

  ngOnInit() {

    this.post_id = JSON.parse(localStorage.getItem("post details")).id;
    this.commentService.getComments(this.post_id).subscribe((data: any) => {
      localStorage.setItem('comments', JSON.stringify(data));
      this.comments = JSON.parse(localStorage.getItem("comments"))
    })

  }



  onClick(comment) {
    localStorage.setItem('comment details', JSON.stringify(comment));
  }

  delete(id, body) {

    console.log("comment id : " + id);
    if (window.confirm('Are you sure you want to delete' + body + "?")) {
      this.commentService.deleteComment(id, this.post_id).subscribe((data: any) => {

        this.toastr.success('Sucess!', body + ' is deleted!');
        location.reload();
      })
    }
  }

}
