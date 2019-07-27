import Base from "./core/BaseModule";
import ParserModule from "./parser/ParserModule";

const modules: Base.IBaseModule[] = [
    new ParserModule()
];

export default modules;
