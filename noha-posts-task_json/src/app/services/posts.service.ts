import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  url: string = "http://localhost:5555/posts";
  httpOptions = {};

  constructor(private http: HttpClient) { }

  // start get posts function 
  getPosts(): Observable<HttpResponse<Object>> {

    console.log(this.url)

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    return this.http.get<HttpResponse<object>>(this.url, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end get posts function 

  // start add post function 
  addPost(post): Observable<HttpResponse<Object>> {

    var postObject = {
      name: post.postName,
      date: post.postDate,
      description: post.postDesc,
      author: post.postAuthor,
      breif: post.post_brief_desc
    }
    console.log(this.url)
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    console.log(JSON.stringify(postObject))

    return this.http.post<HttpResponse<object>>(this.url, JSON.stringify(postObject), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end add post function 


  // start edit post function 
  editPost(post): Observable<HttpResponse<Object>> {

    var postObject = {
      id: post.id,
      name: post.postName,
      date: post.postDate,
      description: post.postDesc,
      author: post.postAuthor,
      breif: post.post_brief_desc
    }
    console.log(postObject.id)

    console.log(this.url)

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    console.log(JSON.stringify(postObject))

    return this.http.put<HttpResponse<object>>(this.url + '/' + postObject.id, JSON.stringify(postObject), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end edit post function 

  // start delete post function 
  deletePost(id): Observable<HttpResponse<Object>> {

    console.log(id)
    return this.http.delete<HttpResponse<object>>(this.url + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  // end delete post function 

  // start error handler function 
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server Error");
  }
  // end error handler function 

}


