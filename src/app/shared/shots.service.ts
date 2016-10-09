import { Injectable } from '@angular/core';
import { Shots } from './shots.model';

@Injectable()
export class ShotsService {

  constructor() { this._shots = new Array<Shots>(); }

  newShot() : Shots {
    var s = Shots.newShot();
    this._shots.push(s);
    return s;
  }

  //getShots(): Promise<Shots[]>{
  //  return Promise.resolve(this._shots);
  //}

  _shots : Shots [];

}
