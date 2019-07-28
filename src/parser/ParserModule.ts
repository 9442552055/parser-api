import Base from "../core/BaseModule";
import Results from "../shared/Results";
import IUser from "./schemas/IUser";
import User from "./schemas/User";
import UserStringDeserializer from "./UserStringDeserializer";

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
        // req.body
        const userStringDeserializer: UserStringDeserializer = new UserStringDeserializer();
        const user: IUser = userStringDeserializer.DeserializeString(req.body.data || "", new User());
        callback({
            data: new Results.SuccessResult(user, "Parsing success"),
            statusCode: 200
        });
    }
}
