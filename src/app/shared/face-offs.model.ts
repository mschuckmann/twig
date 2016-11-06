export class FaceOffs {
    won: boolean;
  playerId: number;
  timeStamp: number;

  constructor( w: boolean, p: number) {
    this.won = w;
    this.playerId = p;
    this.timeStamp = Date.now();

  }

}
