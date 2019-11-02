export class RoomMessage {

  public id: number | null;
  public text: string | null;
  public idRoom: number | null;
  public idUser: number | null;
  public date: Date;

  constructor() {
    this.id = null;
    this.text = null;
    this.idRoom = null;
    this.idUser = null;
    this.date = new Date();
  }

}
