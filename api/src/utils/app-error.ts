export class AppError extends Error {
  public statusCode: number;
  // This property is to define wether the error is expected or not
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
