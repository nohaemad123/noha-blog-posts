import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url: string = "https://60b86f99b54b0a0017c03949.mockapi.io";
  httpOptions = {};


  constructor(private http: HttpClient) { }


  // start get comments function 
  getComments(id): Observable<HttpResponse<Object>> {
    console.log(this.url)
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    return this.http.get<HttpResponse<object>>(this.url + '/posts/' + id + "/comments", this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end get comments function 

  // start add comment function 
  addComment(comment, post_id): Observable<HttpResponse<Object>> {

    var commentObject = {
      author: comment.commentAuthor,
      date: comment.commentDate,
      body: comment.commentBody
    }

    console.log(this.url);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    console.log(JSON.stringify(commentObject))

    return this.http.post<HttpResponse<object>>(this.url + '/posts/' + post_id + "/comments", JSON.stringify(commentObject), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end add comment function 

  // start edit comment function 
  editComment(comment, post_id): Observable<HttpResponse<Object>> {

    var commentObject = {
      id: comment.id,
      author: comment.commentAuthor,
      date: comment.commentDate,
      body: comment.commentBody,
      postId: post_id,

    }

    console.log(commentObject.id)
    console.log(this.url)

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    console.log(JSON.stringify(commentObject))

    return this.http.put<HttpResponse<object>>(this.url + "/posts/" + commentObject.postId + "/comments/" + commentObject.id, JSON.stringify(commentObject), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end edit comment function 

  // start delete comment function 
  deleteComment(comment_id, post_id): Observable<HttpResponse<Object>> {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    return this.http.delete<HttpResponse<object>>(this.url + "/posts/" + post_id + '/comments/' + comment_id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end delete comment function 

  // start error handler function 
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server Error");
  }
  // end error handler function 


}
