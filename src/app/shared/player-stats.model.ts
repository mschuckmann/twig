import { Players, PlayersService, ShotType, Shots, ShotsService, PlayerShotsService } from '../shared';


enum ForeAgainst {FORE, AGAINST};

export class PlayerStats {
  player: Players;

  //all the shots in one 2 dimensional array.
  //First dimension is the type of shot, second dim is if the shot is for
  // or agains.
  _shots : number[][] = [[0,0],[0,0],[0,0],[0,0]];
  _goals : number = 0;
  _assists : number = 0;

  updateShots(type : ShotType, fore : boolean, goal : boolean, assist : boolean) {
    let i = fore ? ForeAgainst.FORE : ForeAgainst.AGAINST;
    ++this._shots[type][i];
    if(goal)
      ++this._goals;
    if(assist)
      ++this._assists;
  }

  shotsFore(): number {
    return this.savesFore() + this.goalsFore() + this.missesFore() + this.blocksFore();
  }

  shotsAgainst(): number {
    return this.savesAgainst() + this.goalsAgainst() + this.missesAgainst() + this.blocksAgainst();
  }

  corsi(): number {
    return this.shotsFore() - this.shotsAgainst();
  }

  savesFore() : number {
    return this._shots[ShotType.SAVE][ForeAgainst.FORE];
  }

  goalsFore() : number {
    return this._shots[ShotType.GOAL][ForeAgainst.FORE];
  }

  missesFore() : number {
    return this._shots[ShotType.MISS][ForeAgainst.FORE];
  }

  blocksFore() : number {
    return this._shots[ShotType.BLOCK][ForeAgainst.FORE];
  }

  savesAgainst() : number {
    return this._shots[ShotType.SAVE][ForeAgainst.AGAINST];
  }

  goalsAgainst() : number {
    return this._shots[ShotType.GOAL][ForeAgainst.AGAINST];
  }

  missesAgainst() : number {
    return this._shots[ShotType.MISS][ForeAgainst.AGAINST];
  }

  blocksAgainst() : number {
    return this._shots[ShotType.BLOCK][ForeAgainst.AGAINST];
  }

  goalsScored() : number {
    return this._goals;
  }

  assists() : number {
    return this._assists;
  }

}
