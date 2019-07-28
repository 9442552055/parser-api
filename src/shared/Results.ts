import Base from "../base";
// tslint:disable-next-line: no-namespace
namespace Shared.Results {

    export class Result implements Base.IResult<any> {
        public isSuccess: boolean;
        public data: any;
        public message: string;
        public error: object;
        constructor(status: boolean, data: any, message: string, error: object) {
            this.isSuccess = status;
            this.data = data;
            this.message = message;
            this.error = error;
        }
    }

    // tslint:disable-next-line: max-classes-per-file
    export class SuccessResult extends Result {
        constructor(data: any, message?: string) {
            message = message || "";
            super(true, data, message, {});
        }
    }

    // tslint:disable-next-line: max-classes-per-file
    export class FailureResult extends Result {
        constructor(error: object, message: string) {
            super(false, {}, message, error);
        }
    }
}

export default Shared.Results;
