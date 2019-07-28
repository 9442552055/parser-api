import IDeserializable from "./IDeserializable";

export default interface IFormatable<T> extends IDeserializable<T> {
    Format(data: T): T;
}
