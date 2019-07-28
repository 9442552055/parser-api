import IFormatable from "../../base/IFormatable";
import IUser from "../../base/IUser";
import User from "./User";

export default class FormatedUser extends User implements IFormatable<IUser> {
    public firstName: string = "";
    public lastName: string = "";
    public clientId: string = "";
    constructor() {
        super();
    }

    public Format(data: IUser): IUser {
        this.firstName = data.firstName.split("0").join("");
        this.lastName = data.lastName.split("0").join("");
        this.clientId = this.insert(data.clientId, "-", 3);
        return this;
    }

    public Deserialize(text: string): IUser {
        return super.Deserialize(text);
    }

    private insert(text: string, insertText: string, position: number): string {
        if (position > text.length) {
            return text;
        }
        insertText = insertText || "";
        return text.slice(0, position) + insertText + text.slice(position);
    }
}
