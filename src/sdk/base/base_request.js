

export class BaseRequest{

  constructor(path,method,params) {
    this.path = path;
  }

  call(){
    conlose.log("base request"+this.path);
  }
}
