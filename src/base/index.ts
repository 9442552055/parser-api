import Core from "../core";
// tslint:disable-next-line: no-namespace
namespace Base {

    export interface IResult<T> {
        isSuccess: boolean;
        data: T;
        message: string;
        error: object;
    }

    export interface IHTTPResult {
        statusCode: number;
        data: IResult<any>;
    }
    export interface IRouteConfig {
        method: HttpMethod;
        path: string;
        handleRoute(req: Core.Request, callback: (result: IHTTPResult) => void): void;
    }

    export interface IBaseModule {
        modulePath: string;
        getRoutes(): IRouteConfig[];
    }

    export enum HttpMethod {
        GET = "get",
        POST = "post",
        PUT = "put",
        DELETE = "delete"
    }
}

export default Base;
