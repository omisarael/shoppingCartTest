import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//  Un sujeto es como un observable,
//  pero se puede realizar una multidifusión a muchos observadores.
//  Los sujetos son como EventEmitters: mantienen un registro de muchos oyentes.

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  // conectar a el productoItem con cart Component
  subject = new Subject();

  constructor() { }
  sendMsg(product) {
   // console.log(product);
    this.subject.next(product);
  }

  getMsg() {
    return this.subject.asObservable();
  }

}
