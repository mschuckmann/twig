
export enum ShotType {
  GOAL, SAVE, MISS, BLOCK
}

export enum GoalType {
  EVEN, POWER_PLAY, SHORT_HANDED, NO_GOAL
}

class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}

export class Shots {
  id : string;
  type : ShotType;
  shotFore: boolean;
  goalType : GoalType;
  shooterPlayerId: number;
  assist1PlayerId: number;
  assist2PlayerId: number;

  static newShot(): Shots {
    var s = new Shots();
    s.id = Guid.newGuid();
    return s;
  }

}
