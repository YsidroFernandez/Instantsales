import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CauseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CauseProvider {


  //urlServer : string = 'http://209.156.175.205/nucli/api/';
  urlServer : string = 'intranet/';


  //urlServer : string = 'http://190.207.149.184/nucli/api/';

  constructor(public http: HttpClient) {
    console.log('Hello CauseProvider Provider');
  }

  getCauses(data){
    var body = {"idString": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/cause/getCausesHome/', body)
      this.http.post(this.urlServer +'cause/getCausesHome/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getCausesFavorites(data){
    var body = {"idString": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/cause/getCausesFavorites/', body)
      this.http.post(this.urlServer+'cause/getCausesFavorites/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getCausesUser(data){
    var body = {"idString": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/cause/getCausesUser/', body)
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
      //this.http.post('intranet/cause/addLike/', body)
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
      //this.http.post('intranet/cause/deleteLike/', body)
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
      //this.http.post('intranet/cause/addFavorite/', body)
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
      //this.http.post('intranet/cause/deleteFavorite/', body)
      this.http.post(this.urlServer+'cause/deleteFavorite/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  addCause(data){
    var body = {"cause": data};
    return new Promise((resolve, reject) => {
      //this.http.post('intranet/cause/addCause/', body)
      this.http.post(this.urlServer+'cause/addCause/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCauseById(data){
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
