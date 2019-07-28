import Base from "../core/Base";
import parseHandler from "./handlers/parseHandler";

export default class ParserModule implements Base.IBaseModule {

    public modulePath: string = "/parser";
    public getRoutes(): Base.IRouteConfig[] {
        return [
            {
                handleRoute: parseHandler,
                method: Base.HttpMethod.POST,
                path: "/parse"
            }
        ];
    }
}
