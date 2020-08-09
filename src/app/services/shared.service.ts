
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private data = {};

  constructor() { }

  setData(key:string,value:any){
      this.data[key]= value;
  }

  getData():any {
    return this.data;
  }

  getDataValue(key:string):any {
    return this.data[key]
  }
}
