/**
 * A class to help standardise error handling
 *
 * @export
 * @class CustomError
 */
export class CustomError {
    /**
     * the User friendly Error MEssage
     *
     * @private
     * @type {string}
     * @memberof CustomError
     */
    private ErrorMessage: string;
    /**
     * the function the Error was thrown
     *
     * @private
     * @type {string}
     * @memberof CustomError
     */
    private atFunction: string;
    /**
     * the original non user friendly error
     *
     * @private
     * @type {*}
     * @memberof CustomError
     */
    private originalError: any;

    /**
     *Creates an instance of CustomError.
     * @param {string} message The user friendly message
     * @param {string} atFunction the function the error was thrown at
     * @param {*} originalError the orriginal error
     * @memberof CustomError
     */
    constructor(message: string, atFunction: string, originalError: any) {
        this.ErrorMessage = message;
        this.atFunction = atFunction;
        this.originalError = originalError;

        if (true) {
            console.error(`${message} at Function ${atFunction}`);
        }
        
    }

    /**
     * Queries the user friendly error message
     *
     * @returns {string} the user friendly error message
     * @memberof CustomError
     */
    public getErrorMessage(): string {
        return this.ErrorMessage;
    }

    /**
     *Queries the function which has thrown the error
     *
     * @returns {string}
     * @memberof CustomError
     */
    public getCallerFunction(): string {
        return this.atFunction;
    }

    /**
     * queries the original error
     *
     * @returns {*} the original error
     * @memberof CustomError
     */
    public getOrignalError(): any {
        return this.originalError;
    }
}