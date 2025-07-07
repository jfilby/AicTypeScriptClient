export class CustomError extends Error {
    constructor(message) {
        var _a;
        super(message);
        this.name = 'CustomError';
        this.name = 'CustomError';
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, CustomError);
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
        };
    }
}
