import IDeserializable from "./schemas/IDeserializable";
import IUser from "./schemas/IUser";

interface IUserDeserializable extends IDeserializable<IUser> {

}

// tslint:disable-next-line: no-shadowed-variable
interface IStringDeserializer<IUserDeserializable> {
    DeserializeString(text: string, deserializable: IUserDeserializable): IUser;
}

export default class UserStringDeserializer implements IStringDeserializer<IDeserializable<IUser>> {
    public DeserializeString(text: string, deserializable: IDeserializable<IUser>): IUser {
        return deserializable.Deserialize(text);
    }
}
