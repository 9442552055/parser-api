import Base from "../../core/Base";
import Results from "../../shared/Results";
import IUser from "../schemas/IUser";
import User from "../schemas/User";
import UserStringDeserializer from "../UserStringDeserializer";

function parseHandler(req: Base.Request, callback: (result: Base.IHTTPResult) => void) {
    // req.body
    const userStringDeserializer: UserStringDeserializer = new UserStringDeserializer(new User());
    const user: IUser = userStringDeserializer.DeserializeString(req.body.data || "");
    callback({
        data: new Results.SuccessResult(user, "Parsing success"),
        statusCode: 200
    });
}

export default parseHandler;
