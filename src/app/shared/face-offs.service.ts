import { Injectable } from '@angular/core';
import { FaceOffs } from './face-offs.model';

@Injectable()
export class FaceOffsService {

  face_offs: FaceOffs [];

  constructor() { this.face_offs = new Array<FaceOffs>(); }

  addFaceOff(w: boolean, playerId: number) {
    let fo = new FaceOffs(w, playerId);
    this.face_offs.push(fo);
    //this.playerShotsUpdated.emit(ps);
  }

  getFaceOffs(): Promise<FaceOffs[]>{
    return Promise.resolve(this.face_offs);
  }
}
