import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserPostsService {
  private readonly resourceUrl: string = '/Posts';
  private readonly baseUrl: string  = environment.server;

  constructor(private http: HttpClient) { }

  addUserPost(body: any) {
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + '/addpost', body);
  }
  addPhoto(formData: FormData, UserID: string) {
    const params: HttpParams = new HttpParams().set('UserID', UserID);
    return this.http.post<{ path: string }>(`${this.baseUrl}` + '/Account' + '/addPhoto', formData, {params});
  }

  getFollowPosts(UserID: string){
    const params: HttpParams = new HttpParams().set('UserID', UserID);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getFollowingPosts', {params});
  }
  getMyPosts(UserID: string){
    const params: HttpParams = new HttpParams().set('UserID', UserID);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getUserPosts', {params});
  }

  getAllPosts(){
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getAllPosts');
}

  delete(postID: string){
    const params: HttpParams = new HttpParams().set('postID', postID);
    return this.http.delete(`${this.baseUrl}${this.resourceUrl}` + '/deletePost', {params});
  }


}
