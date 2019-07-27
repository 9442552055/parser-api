
// tslint:disable-next-line: no-namespace
namespace Shared.Results {
    export interface IResult<T> {
        isSuccess: boolean;
        data: T;
        message: string;
        error: object;
    }

    class Result<T> implements IResult<T> {
        public isSuccess: boolean;
        public data: T;
        public message: string;
        public error: object;
        constructor(status: boolean, data: T, message: string, error: object) {
            this.isSuccess = status;
            this.data = data;
            this.message = message;
            this.error = error;
        }
    }

    // tslint:disable-next-line: max-classes-per-file
    export class SuccessResult<T> extends Result<T> {
        constructor(data: T, message?: string) {
            message = message || "";
            super(true, data, message, {});
        }
    }

    // tslint:disable-next-line: max-classes-per-file
    export class FailureResult extends Result<object> {
        constructor(error: object, message: string) {
            super(false, {}, message, error);
        }
    }
}

export default Shared.Results;
