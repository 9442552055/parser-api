import Base from "../base";
import parseHandler from "./handlers/parseHandler.v2";

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
