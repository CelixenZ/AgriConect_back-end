import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
    // Defines the standard HTTP status code (e.g., 404, 500)
    statusCode: StatusCodes; 
    // Defines the status string ('fail' for 4xx, 'error' for 5xx)
    status: string;
    // Marks if this is an error we expect and handle gracefully
    isOperational: boolean;

    /**
     * Creates a new operational error.
     * @param message The error message.
     * @param statusCode The HTTP status code.
     */
    constructor(message: string, statusCode: StatusCodes) {
        // Call the parent Error constructor
        super(message);

        this.statusCode = statusCode;
        // Determine the failure status based on the HTTP code
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        // Capture the stack trace to know where the error originated
        // The second argument skips the constructor call itself in the stack
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;