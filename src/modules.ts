import Base from "./core/Base";
import ParserModule from "./parser/ParserModule";

const modules: Base.IBaseModule[] = [
    new ParserModule()
];

export default modules;
