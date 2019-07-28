export default interface IDeserializable<T> {
    Deserialize(text: string): T;
}
