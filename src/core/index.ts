import express from "express";
import Results from "../shared/Results";

// tslint:disable-next-line: no-namespace
namespace Core {
    export import Request = express.Request;
    export import Response = express.Response;
    export import Application = express.Application;
    export import RequestHandler = express.RequestHandler;
    export import Router = express.Router;

    export function emodule() { return express(); }

}

export default Core;
