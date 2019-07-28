import bodyParser from "body-parser";
// import express from "express";
import Base from "../core/Base";
import logger from "./Logger";

// tslint:disable-next-line: no-namespace
namespace Shared.Routes {

    class RoutesProvider {
        private static handleRoute(route: Base.IRouteConfig): Base.RequestHandler {
            return (req: Base.Request, res: Base.Response) => {
                route.handleRoute(req, (result: Base.IHTTPResult) => {
                    res.status(result.statusCode).send(result.data);
                });
            };
        }
        public readonly modulePath: string;
        public readonly module: Base.Router;
        private routes: Base.IRouteConfig[];
        // app: express.Application,
        constructor(modulePath: string, routes: Base.IRouteConfig[]) {
            this.module = Base.Router();
            this.routes = routes;
            this.modulePath = modulePath;
            // app.use(modulePath, this.module);
            this.module.use((req, res, next) => {
                logger.silly("route entry in ", modulePath);
                next();
            });
        }

        public registerRoutes(): void {
            this.routes.forEach((route) => {
                this.module[route.method](route.path, RoutesProvider.handleRoute(route));
            });
        }
    }

    // tslint:disable-next-line: max-classes-per-file
    export class MiddlewaresLoader {
        public static getMiddlewares(): Base.RequestHandler[] {
            const jsonParser: Base.RequestHandler = bodyParser.json();
            // const textParser: express.RequestHandler = bodyParser.text({ type: "text/html" });
            // create application/x-www-form-urlencoded parser
            // const urlencodedParser: express.RequestHandler = bodyParser.urlencoded({ extended: false });

            return [jsonParser];
        }
    }

    // tslint:disable-next-line: max-classes-per-file
    export class ModuleRoutesLoader {
        public static registerRoutesInModule(modules: Base.IBaseModule[]): RoutesProvider[] {
            const modPathValidation: any = {};
            return modules.map((mod) => {
                if (!modPathValidation[mod.modulePath]) {
                    const modRouter = new RoutesProvider(mod.modulePath, mod.getRoutes());
                    // modRouter.registerRoutes(mod.getRoutes());
                    modPathValidation[mod.modulePath] = modRouter;
                } else {
                    logger.error("Already a module regitered with the same path!", mod.modulePath);
                }
                return modPathValidation[mod.modulePath];
            });
        }
    }
}

export default Shared.Routes;
