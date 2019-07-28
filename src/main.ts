import dotenv from "dotenv";
import express, { Router } from "express";
import modules from "./modules";
import logger from "./shared/Logger";
import Results from "./shared/Results";
import Routes from "./shared/RoutesProvider";

class Main {

    private rootApp: express.Application;

    constructor() {
        this.rootApp = express();
    }
    public async bootstrap(): Promise<Main> {
        // 1.
        const configResult = await this.configure();
        if (configResult.isSuccess) {
            // 2.
            this.intialize();
            // 3.
            const startResult = await this.start();
        }
        return this;
    }

    private intialize(): void {
        const basePath: string = process.env.BASE_PATH || "";
        const moduleRouter: express.Application = express();
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

    private async configure(): Promise<Results.IResult<any>> {
        logger.info("configuration starts!");
        const args: string[] = process.argv.slice(2);
        return new Promise((r) => {
            logger.info("configuration success!");
            dotenv.config({
                path: args[0] || ".env"
            });
            r(new Results.SuccessResult("Configuration success!"));
        });
    }

    private async start(): Promise<Results.IResult<any>> {
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

const app: Main = new Main();

app.bootstrap();
