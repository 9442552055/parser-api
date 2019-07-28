import IDeserializable from "./schemas/IDeserializable";
import IUser from "./schemas/IUser";

// tslint:disable-next-line: no-shadowed-variable
interface IStringDeserializer<T> {
    DeserializeString(text: string): T;
}

abstract class UserStringDeserializerBase implements IStringDeserializer<IUser> {
    protected user: IDeserializable<IUser>;
    constructor(user: IDeserializable<IUser>) {
        this.user = user;
    }
    public abstract DeserializeString(text: string): IUser;
}

// tslint:disable-next-line: max-classes-per-file
export default class UserStringDeserializer extends UserStringDeserializerBase {
    constructor(user: IDeserializable<IUser>) {
        super(user);
    }
    public DeserializeString(text: string): IUser {
        return this.user.Deserialize(text);
    }
}
