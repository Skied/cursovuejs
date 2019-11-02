export class UserMessage {

  public id: number | null;
  public text: string | null;
  public idSender: number | null;
  public idReceiver: number | null;
  public date: Date;
  public markedAsRead: boolean;

  constructor() {
    this.id = null;
    this.text = null;
    this.idSender = null;
    this.idReceiver = null;
    this.date = new Date();
    this.markedAsRead = false;
  }

}
