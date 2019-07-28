// configuration reader
import dotenv from "dotenv";
// core frame that helps the app to be setup and run
import Core from "../core";
// Helpers from shared module
import logger from "../shared/Logger";
import Results from "../shared/Results";
import Routes from "../shared/Router";
// application related modules
import modules from "./modules";

export default class Main {

    private rootApp: Core.Application;

    constructor() {
        // express();
        // removed direct dependency of express in main, instead used through core.Core
        this.rootApp = Core.emodule();
    }

    public async bootstrap(): Promise<Main> {
        // 1. Do load configurations
        const configResult = await this.configure();
        if (configResult.isSuccess) {
            // 2. setup application
            this.intialize();
            // 3. run application
            const startResult = await this.start();
        }
        return this;
    }

    private intialize(): void {
        // sub module
        const basePath: string = process.env.BASE_PATH || "";
        const moduleRouter: Core.Application = Core.emodule();
        this.rootApp.use(basePath, moduleRouter);
        // load middlerwares
        Routes.MiddlewaresLoader
            .getMiddlewares()
            .forEach((m) => moduleRouter.use(m));
        // load modules
        Routes.ModuleRoutesLoader
            .registerRoutesInModule(modules)
            .forEach((router) => {
                moduleRouter.use(router.modulePath, router.module);
                router.registerRoutes();
            });
    }

    private async configure(): Promise<Results.Result> {
        logger.info("configuration starts!");
        const args: string[] = process.argv.slice(2);
        return new Promise((r) => {
            logger.info("configuration success!");
            dotenv.config({
                path: args[0] || ".env"
            });
            // To Load transports if file logging enabled
            logger.configure();
            r(new Results.SuccessResult("Configuration success!"));
        });
    }

    private async start(): Promise<Results.Result> {
        logger.info("application starts!");
        return new Promise((r) => {
            logger.info("start success!");
            const PORT: number = Number(process.env.APP_PORT);
            this.rootApp.listen(PORT, "0.0.0.0", (server: any) => {
                logger.debug("server listening in ", PORT);
                r(new Results.SuccessResult("Application start success!"));
            });
        });
    }
}
