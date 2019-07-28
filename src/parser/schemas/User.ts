import IDeserializable from "./IDeserializable";
import IUser from "./IUser";

export class User implements IUser, IDeserializable<IUser> {

    public firstName: string = "";
    public lastName: string = "";
    public clientId: string = "";

    // constructor(firstName: string, lastName: string, clientId: string) {
    //     this.firstName = firstName || "";
    //     this.lastName = lastName || "";
    //     this.clientId = clientId || "";
    // }

    public Deserialize(text: string): IUser {
        let temp = [];
        let foundsplit = false;
        let splitend = false;
        for (let a = 0; a < text.length; a++) {
            if (text[a + 1] === "0" || typeof text[a + 1] === "undefined") {
                foundsplit = true;
            }
            temp.push(text[a]);
            if (foundsplit && (text[a + 1] !== "0" || typeof text[a + 1] === "undefined")) {
                foundsplit = false;
                splitend = true;
            }
            if (!foundsplit && splitend) {
                if (!this.firstName) {
                    this.firstName = temp.join("");
                } else if (!this.lastName) {
                    this.lastName = temp.join("");
                } else if (!this.clientId) {
                    this.clientId = temp.join("");
                }
                temp = [];
                foundsplit = false;
                splitend = false;
            }
        }
        return this;
    }
}

export default User;
