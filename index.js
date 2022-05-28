import TemplatingEngine from "./TemplatingEngine.js";
import * as fs from "fs";

const engine = new TemplatingEngine(fs.readFileSync("./index.html", "utf-8"), {
    variable: "Hello World",
    nestedVariable: {
        variable: "Hello World",
    },
});

console.log(engine.render());
