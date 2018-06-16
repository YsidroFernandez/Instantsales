import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//joanrosendo181282
/*
 Clase UserProvider
 Se usa para conectarse a los endpoints del servidor de la app 
 que maneja las funciones del usuario
*/
@Injectable()
export class UserProvider {

  
   //urlServer: String = 'http://209.156.175.205/nucli/api/';
   urlServer: String = 'intranet/';


  //urlServer: String = 'http://190.207.149.184/nucli/api/';

  
  constructor(public http: HttpClient) {

  }
 
  getUser(idString, idStringLogged){
    var data = {"idString": idString, "idStringLogged": idStringLogged};
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer + 'user/getUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

//joan181282
  getUserByUsername(username){
    var data = {'username': username};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer + 'user/getUserByUsername/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserByEmail(email){
    var data = {'email': email};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer + 'user/getUserByEmail/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  loginUser(username, password){
    return this.http.get(this.urlServer+'user/loginUser/username/'+username+'/password/'+password);
  }

  addUser(data) {
    data['countpublications'] = 0;
    data['countFollowers'] = 0;
    data['countFollowing'] = 0;

    data['profilePicture'] = 'assets/imgs/icon-user.png';
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/addUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addUserfb(data) {
    data['countpublications'] = 0;
    data['countFollowers'] = 0;
    data['countFollowing'] = 0;
   
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/addUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  editUser(data) {
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/updateUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUserPicture(data){
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/updateUserPhotoProfile/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getFollowers(idString){
    var body = {"idString": idString, "type":"Followers"};
    var data = {"friend": body};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/getFriends/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getFollowing(idString){
    var body = {"idString": idString, "type":"Following"};
    var data = {"friend": body};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/getFriends/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addFollower(followerId, followedId){
    var body = {"followerId": followerId, "followedId":followedId};
    var data = {"follower": body};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/addFollower/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteFollower(followerId, followedId){
    var body = {"followerId": followerId, "followedId":followedId};
    var data = {"follower": body};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/deleteFollower/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //Metodo que se trae todos los likes que ha recibido un usuario
  getLikesUser(idString){
    var body = {"idString": idString};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/getLikesUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /*Metodo que verifica si un usuario tiene notificaciones de like
  que no ha visto*/
  areNewLikes(idString){
    var body = {"idString": idString};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/areNewLikes/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
