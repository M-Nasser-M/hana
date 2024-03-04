export class AuthError extends Error {
  constructor(message: string = "you need to login to access this page") {
    super(message);
    this.name = "AuthError";
  }
}

export class DataValidationError extends Error {
  constructor(message: string = "error while validating data") {
    super(`error while validating ${message} data`);
    this.name = "DataValidationError";
  }
}

export class CreateCartError extends Error {
  constructor(message: string = "Error Creating Cart") {
    super(message);
    this.name = "CreateCartError";
  }
}
