import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the publicationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class publicationProvider {


  //urlServer : string = 'intranet/';
  //urlServer : string = 'http://instantsales.us-3.evennode.com/api/';
  urlServer: String = 'http://localhost:3000/api/'

  constructor(public http: HttpClient) {
    console.log('Hello publicationProvider Provider');
  }

  getpublications(data){
    var body = {"idString": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/getpublicationsHome/', body)
      this.http.post(this.urlServer+'publication/getPublicationsHome/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getpublicationsFavorites(data){
    var body = {"idString": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/getpublicationsFavorites/', body)
      this.http.post(this.urlServer+'publication/getPublicationsFavorites/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getpublicationsUser(userIdLogged,userIdPublications){
    var body = {userIdLogged,userIdPublications};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/getpublicationsUser/', body)
      this.http.post(this.urlServer+'publication/getPublicationsUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addLike(data){
    var body = {"like": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/addLike/', body)
      this.http.post(this.urlServer+'publication/addLike/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  unlike(data){
    var body = {"like": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/deleteLike/', body)
      this.http.post(this.urlServer+'publication/deleteLike/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  addFavorite(data){
    var body = {"favorite": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/addFavorite/', body)
      this.http.post(this.urlServer+'publication/addFavorite/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  deleteFavorite(data){
    var body = {"favorite": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/deleteFavorite/', body)
      this.http.post(this.urlServer+'publication/deleteFavorite/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  addpublication(data){
    var body = {"publication": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/addpublication/', body)
      this.http.post(this.urlServer+'publication/addPublication/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getpublicationById(data){
    var body = {'idString': data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'publication/getPublicationById/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
