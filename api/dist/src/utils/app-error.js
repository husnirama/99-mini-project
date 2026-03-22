export class AppError extends Error {
    statusCode;
    // This property is to define wether the error is expected or not
    isOperational;
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}
//# sourceMappingURL=app-error.js.map