import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the publicationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class publicationProvider {


   //urlServer : string = 'http://209.156.175.205/nucli/api/';
  urlServer : string = 'intranet/';


  //urlServer : string = 'http://190.207.149.184/nucli/api/';

  constructor(public http: HttpClient) {
    console.log('Hello publicationProvider Provider');
  }

  getpublications(data){
    var body = {"idString": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/getpublicationsHome/', body)
      this.http.post(this.urlServer +'cause/getCausesHome/', body)
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
      this.http.post(this.urlServer+'cause/getCausesFavorites/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getpublicationsUser(data){
    var body = {"idString": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/publication/getpublicationsUser/', body)
      this.http.post(this.urlServer+'cause/getCausesUser/', body)
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
      this.http.post(this.urlServer+'cause/addLike/', body)
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
      this.http.post(this.urlServer+'cause/deleteLike/', body)
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
      this.http.post(this.urlServer+'cause/addFavorite/', body)
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
      this.http.post(this.urlServer+'cause/deleteFavorite/', body)
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
      this.http.post(this.urlServer+'cause/addCause/', body)
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
      this.http.post(this.urlServer+'cause/getCauseById/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
