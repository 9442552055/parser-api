import IDeserializable from "../../base/IDeserializable";
import IFormatable from "../../base/IFormatable";
import IUser from "../../base/IUser";
import UserStringDeserializerBase from "./UserStringDeserializerBase";

// tslint:disable-next-line: max-classes-per-file
class UserStringDeserializer extends UserStringDeserializerBase {
    constructor(user: IDeserializable<IUser>) {
        super(user);
    }
    public DeserializeString(text: string): IUser {
        return this.user.Deserialize(text);
    }
}

export default UserStringDeserializer;
