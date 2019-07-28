import IFormatable from "../../base/IFormatable";
import IUser from "../../base/IUser";
import UserStringDeserializerBase from "./UserStringDeserializerBase";
// tslint:disable-next-line: max-classes-per-file
export default class FormatedUserStringDeserializer extends UserStringDeserializerBase {
    constructor(user: IFormatable<IUser>) {
        super(user);
    }
    public DeserializeString(text: string): IUser {
        const data: IUser = this.user.Deserialize(text);
        return (this.user as IFormatable<IUser>).Format(data);
    }
}
