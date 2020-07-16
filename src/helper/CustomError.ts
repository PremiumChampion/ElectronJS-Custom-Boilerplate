export class CustomError {
    private ErrorMessage: string;
    private atFunction: string;
    private originalError: any;

    constructor(message: string, atFunction: string, originalError: any) {
        this.ErrorMessage = message;
        this.atFunction = atFunction;
        this.originalError = originalError;

        if (true) {
            console.error(`${message} at Function ${atFunction}`);
        }
        
    }

    public getErrorMessage(): string {
        return this.ErrorMessage;
    }

    public getCallerFunction(): string {
        return this.atFunction;
    }

    public getOrignalError(): any {
        return this.originalError;
    }
}