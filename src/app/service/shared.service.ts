import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public addedItem = new BehaviorSubject<any>(null)
  public editItem = new BehaviorSubject<any>(null)


  constructor() { }

  shareAddedItem(value) {
    this.addedItem.next(value);
  }

  shareEditItem(value) {
    this.editItem.next(value);
  }
}
