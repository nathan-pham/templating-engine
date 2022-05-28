import * as fs from "fs";

const OPEN_DEL = "{{";
const CLOSE_DEL = "}}";

export default class TemplatingEngine {
    constructor(content = "", data = {}) {
        this.content = content;
        this.locals = data;
    }
    evaluate(sectionContent) {
        // import statement
        const importRegex = /import\((.*)\)/g;
        const importMatch = importRegex.exec(sectionContent);
        if (importMatch) {
            const [_, importPath] = importMatch;
            const importContent = fs.readFileSync(
                importPath.substring(1, importPath.length - 1),
                "utf-8"
            );

            return importContent;
        } else if (
            !sectionContent.startsWith("return") &&
            sectionContent.trim().split("\n").length === 1
        ) {
            return this.evaluate(`return ${sectionContent}`);
        }

        return new Function(`with(this.locals) { 
            try {
                ${sectionContent}
            } catch(e) {
                return e;
            }
        }`).call(this);
    }

    compile() {
        let content = "";
        let currentIndex = 0;
        while (currentIndex < this.content.length) {
            const startIndex = this.content.indexOf(OPEN_DEL, currentIndex);
            const endIndex = this.content.indexOf(CLOSE_DEL, currentIndex);

            if (startIndex === -1 || endIndex === -1) {
                content += this.content.substring(currentIndex);
                break;
            }

            const sectionContent = this.evaluate(
                this.content
                    .substring(startIndex + OPEN_DEL.length, endIndex)
                    .trim()
            );

            content += this.content.substring(currentIndex, startIndex);

            if (sectionContent) {
                content += sectionContent;
            }

            currentIndex = endIndex + CLOSE_DEL.length;
        }

        return content;
    }
}
