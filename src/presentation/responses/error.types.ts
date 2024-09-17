/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
  res: null;
  constructor(public statusCode: number, message: string) {
    super(message);
    this.res = null;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

