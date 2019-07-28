import IDeserializable from "../../base/IDeserializable";
import IFormatable from "../../base/IFormatable";
import IStringDeserializer from "../../base/IStringDeserializer";
import IUser from "../../base/IUser";

export default abstract class UserStringDeserializerBase implements IStringDeserializer<IUser> {
    protected user: IDeserializable<IUser>;
    constructor(user: IDeserializable<IUser>) {
        this.user = user;
    }
    public abstract DeserializeString(text: string): IUser;
}
// // tslint:disable-next-line: max-classes-per-file
// export abstract class FormatedUserStringDeserializerBase extends UserStringDeserializerBase {

// }
