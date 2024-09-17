/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { IJsonResponse } from './json-response.contract';

export class SuccessResponse<T> implements IJsonResponse<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(statusCode: number, data: T, message?: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class Ok<T> extends SuccessResponse<T> {
    constructor(data: T, message?: string) {
      super(HttpStatus.OK, data, message || "Ok");
    }
  }
  
  export class Created<T> extends SuccessResponse<T> {
    constructor(data: T, message?: string) {
      super(HttpStatus.CREATED, data, message || "Created");
    }
  }
