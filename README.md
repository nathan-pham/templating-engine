![project banner](https://project-banner.phamn23.repl.co/?title=Templating-Engine&description=Yet%20another%20template%20rendering%20engine&stack=node)

# Templating Engine

Yet another template rendering engine. Not tested, but seems to work.

## Usage

Start by creating a new templating engine class by entering a string that will serve as the template and some initial data.

```js
import TemplatingEngine from "./TemplatingEngine.js";
import * as fs from "fs";

const engine = new TemplatingEngine(fs.readFileSync("./index.html", "utf-8"), {
    variable: "Hello World",
    nestedVariable: {
        variable: "Hello World",
    },
});

console.log(engine.compile());
```

Anything between `{{` and `}}` will be evaluated as a function in JavaScript. Using a single variable (ie: `{{ variable }}`) will cause that variable to be inserted or rendered into the document. More complex code should include a return statement.

NOTE: data is _not_ shared between sections.

```html
<!-- prettier-ignore -->
{{ variable }}

{{
    let html = ""
    
    for(let i = 0; i < 10; i++) {
        html += i
    }

    return html
}}
```

You can include components through the `import` statement - you can only use one of these per line.

```html
<!-- prettier-ignore -->
{{ import("./component.html") }}
{{ import("./another-component.html") }}
```
