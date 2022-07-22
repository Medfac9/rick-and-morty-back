export default class HttpException {
  public status: number;

  public message: any;

  constructor(status: number, message: any) {
    this.status = status;
    this.message = message;
  }
}
