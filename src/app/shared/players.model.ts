export class Players {
  first_name: string;
  last_name: string;
  number: number;
  position: string;
  line: string;
  on_ice: boolean;

  saves_fore: number;
  saves_against: number;

  constructor(fname: string, lname: string, num: number, position: string, line: string) {
    this.first_name = fname;
    this.last_name = lname;
    this.number = num;
    this.position = position;
    this.line = line;
    this.on_ice = false;
    this.saves_fore = 0;
    this.saves_against = 0;
  }
}
