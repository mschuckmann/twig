import { Players, PlayersService, ShotType, Shots, ShotsService, PlayerShotsService, Strength, ForeAgainst } from '../shared';

export class PlayerStats {
  player: Players;

  //all the shots in one 2 dimensional array.
  //First dimension is the type of shot, second dim is if the shot is for
  // or against.
  _shotsEven : number[][] = [[0,0],[0,0],[0,0],[0,0]];
  _shotsPP : number[][] = [[0,0],[0,0],[0,0],[0,0]];
  _shotsSH : number[][] = [[0,0],[0,0],[0,0],[0,0]];
  _goals : number[] = [0,0,0];
  _assists : number[] = [0,0,0];
  _faceOffWon : number = 0;
  _faceOffLost: number = 0;

  updateShots(type : ShotType, fore : ForeAgainst, strength : Strength, goal : boolean, assist : boolean) {
    switch(strength) {
      case Strength.EVEN:
        ++this._shotsEven[type][fore];
        break;
      case Strength.POWER_PLAY:
        ++this._shotsPP[type][fore];
        break;
      case Strength.SHORT_HANDED:
        ++this._shotsSH[type][fore];
        break;
    }
    if(goal)
      ++this._goals[strength];
    if(assist)
      ++this._assists[strength];
  }

  updateFaceOffs(won: boolean) {
    if(won) {
      ++this._faceOffWon;
    } else {
      ++this._faceOffLost;
    }
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

  shotStat(type : ShotType, fore : ForeAgainst, strength : Strength) {
    switch(strength) {
      case Strength.EVEN:
        return this._shotsEven[type][fore];
      case Strength.POWER_PLAY:
        return this._shotsPP[type][fore];
      case Strength.SHORT_HANDED:
        return this._shotsSH[type][fore];
    }
  }

  savesFore() : number {
    return this.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.EVEN) +
           this.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.POWER_PLAY) +
           this.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.SHORT_HANDED);
  }

  goalsFore() : number {
    return this.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.EVEN) +
           this.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.POWER_PLAY) +
           this.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.SHORT_HANDED);
  }

  missesFore() : number {
    return this.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.EVEN) +
           this.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.POWER_PLAY) +
           this.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.SHORT_HANDED);
  }

  blocksFore() : number {
    return this.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.EVEN) +
           this.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.POWER_PLAY) +
           this.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.SHORT_HANDED);
  }

  savesAgainst() : number {
    return this.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.EVEN) +
           this.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.POWER_PLAY) +
           this.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.SHORT_HANDED);
  }

  goalsAgainst() : number {
    return this.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.EVEN) +
           this.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.POWER_PLAY) +
           this.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.SHORT_HANDED);
  }

  missesAgainst() : number {
    return this.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.EVEN) +
           this.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.POWER_PLAY) +
           this.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.SHORT_HANDED);
  }

  blocksAgainst() : number {
    return this.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.EVEN) +
           this.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.POWER_PLAY) +
           this.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.SHORT_HANDED);
}

  goalsScored() : number {
    return this._goals.reduce(function(a,b) { return a+b;});
  }

  assists() : number {
    return this._assists.reduce(function(a,b) { return a+b;});
  }

  faceOffsWon() : number {
    return this._faceOffWon;
  }

  faceOffsLost() : number {
    return this._faceOffLost;
  }

}
