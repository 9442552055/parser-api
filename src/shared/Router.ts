import bodyParser from "body-parser";
import Base from "../base";
import Core from "../core";
import logger from "./Logger";

// tslint:disable-next-line: no-namespace
namespace Shared.Routes {

    class RoutesProvider {
        // all the registered routes will be entered here
        // logic of interception can be made here
        private static handleRoute(route: Base.IRouteConfig): Core.RequestHandler {
            return (req: Core.Request, res: Core.Response) => {
                try {
                    route.handleRoute(req, (result: Base.IHTTPResult) => {
                        res.status(result.statusCode).send(result.data);
                    });
                } catch (e) {
                    logger.error("Exception in handling route", req.path, e);
                    res.status(500).send({ message: "Internal server error! contact administrator." });
                }
            };
        }
        // readony fields, should not be modified by external classes
        public readonly modulePath: string;
        public readonly module: Core.Router;
        private routes: Base.IRouteConfig[];
        // app: express.Application,
        constructor(modulePath: string, routes: Base.IRouteConfig[]) {
            this.module = Core.Router();
            this.routes = routes;
            this.modulePath = modulePath;
            // app.use(modulePath, this.module);
            this.module.use((req, res, next) => {
                logger.silly("route entry in ", modulePath);
                next();
            });
        }
        // each route in module config will be looped and
        // the specific handler is registered here
        public registerRoutes(): void {
            this.routes.forEach((route) => {
                this.module[route.method](route.path, RoutesProvider.handleRoute(route));
            });
        }
    }

    // tslint:disable-next-line: max-classes-per-file
    export class MiddlewaresLoader {
        public static getMiddlewares(): Core.RequestHandler[] {

            const jsonParser: Core.RequestHandler = bodyParser.json();

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
