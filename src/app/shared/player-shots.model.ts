export class PlayerShots {
  shotId: string;
  playerId: number;

  constructor( s: string, p: number) {
    this.shotId = s;
    this.playerId = p;
  }
}
