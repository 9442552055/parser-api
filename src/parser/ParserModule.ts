import Base from "../core/BaseModule";
import Results from "../shared/Results";

export default class ParserModule implements Base.IBaseModule {

    public modulePath: string = "/parser";
    public getRoutes(): Base.IRouteConfig[] {
        return [
            {
                handleRoute: this.parseHandler,
                method: Base.HttpMethod.POST,
                path: "/parse"
            }
        ];
    }

    private parseHandler(req: Base.Request, callback: (result: Base.IHTTPResult) => void) {
        callback({
            data: new Results.SuccessResult({}, "Parsing success"),
            statusCode: 200
        });
    }
}
