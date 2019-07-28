import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import * as Transport from "winston-transport";

// tslint:disable-next-line: no-namespace
namespace Shared {
    export class Logger {

        private logger: winston.Logger;
        constructor() {
            this.logger = winston.createLogger({
                transports: [new (winston.transports.Console)({
                    level: process.env.LOG_LEVEL || "silly"
                })]
            });
        }

        public configure() {
            const transports: Transport[] = [new (winston.transports.Console)({
                level: process.env.LOG_LEVEL || "silly"
            })];
            if (process.env.LOG_IN_FILE) {
                transports.push(new (DailyRotateFile)({
                    datePattern: "YYYY-MM-DD-HH",
                    filename: (process.env.LOG_PATH || "./log/") + "application-%DATE%.log",
                    level: process.env.LOG_LEVEL || "silly",
                    maxFiles: "14d",
                    maxSize: "20m",
                    zippedArchive: true
                }));
            }
            this.logger.configure({ transports });
        }

        public error(...args: any[]): void {
            const data = { ...args };
            this.logger.error.apply(this.logger, [data]);
        }

        public warn(...args: any[]): void {
            const data = { ...args };
            this.logger.warn.apply(this.logger, [data]);
        }
        public debug(...args: any[]): void {
            const data = { ...args };
            this.logger.debug.apply(this.logger, [data]);
        }
        public info(...args: any[]): void {
            const data = { ...args };
            this.logger.info.apply(this.logger, [data]);
        }
        public silly(...args: any[]): void {
            const data = { ...args };
            this.logger.silly.apply(this.logger, [data]);
        }
    }
}
export default new Shared.Logger();
