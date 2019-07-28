import express from "express";
import Results from "../shared/Results";

// tslint:disable-next-line: no-namespace
namespace Base {
    export import Request = express.Request;
    export import Response = express.Response;
    export import Application = express.Application;
    export import RequestHandler = express.RequestHandler;
    export import Router = express.Router;

    export function emodule() { return express(); }

    export interface IHTTPResult {
        statusCode: number;
        data: Results.IResult<any>;
    }
    export interface IRouteConfig {
        method: HttpMethod;
        path: string;
        handleRoute(req: express.Request, callback: (result: IHTTPResult) => void): void;
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
