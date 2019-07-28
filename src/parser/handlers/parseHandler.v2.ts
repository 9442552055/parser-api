import Base from "../../base";
import IUser from "../../base/IUser";
import Core from "../../core";
import Results from "../../shared/Results";
import FormatedUserStringDeserializer from "../controllers/FormatedUserStringDeserializer";
import FormatedUser from "../schemas/FormatedUser";

function parseHandler(req: Core.Request, callback: (result: Base.IHTTPResult) => void) {
    // planning for dependecy injection here
    // we have control over those handler calls which is triggered from RoutesProvier
    const userStringDeserializer: FormatedUserStringDeserializer =
        new FormatedUserStringDeserializer(new FormatedUser());
    const user: IUser = userStringDeserializer.DeserializeString(req.body.data || "");

    callback({
        data: new Results.SuccessResult(user, "Parsing success"),
        statusCode: 200
    });
}

export default parseHandler;
