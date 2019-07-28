export default interface IStringDeserializer<T> {
    DeserializeString(text: string): T;
}
