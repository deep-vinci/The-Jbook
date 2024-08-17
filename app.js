let fs = require("node:fs");
let marked = require("marked");


fs.readFile(__dirname + "/markdown.md", "utf-8", (err, data) => {
    if (err) {
        console.log("File read error"); 
        return 0;
    }

    // marked.use();

    const lexer = new marked.Lexer();
    const tokens = lexer.lex(data, {
        async: true,
        pedantic: false,
        gfm: true,
    });

    // tokens.forEach((i, e) => {
    //     if (i.type == "heading") {
    //         if (i.depth == 1) {
    //             console.log(i.text);
    //         } else if (i.depth == 2) {
    //             console.log(`  ${i.text}`);
    //         } else {
    //             console.log(`    ${i.text}`);
    //         }
    //     }
    //     // console.log(i.type == "heading" && i.text )
    // });

    // console.log(marked.parse(data));

    const renderer = {
        heading({ tokens, depth }) {
            const text = this.parser.parseInline(tokens);

            return `
<h${depth} id="${text.replace(/ /g, "_")}">
    <a href="#${text.replace(/ /g, "_")}">${text}</a>
</h${depth}>`;
        },

        list(tokens) {
            console.log(this.parser.parseInline(tokens))
            return this.parser.parseInline(tokens).replace(" ", "9")
        }
    };

    marked.use({ renderer });

    fs.readFile(__dirname + "/template.html", "utf-8", (err, templateData) => {
        console.log(templateData.replace("{{{index}}}", marked.parse(data)))
        data = templateData.replace("{{{index}}}", marked.parse(data));
        fs.writeFile(__dirname + "/out/index.html", data, (err) => {
            if (err) {
                console.log("error writing to file")
            }
        })
    })
    // console.log(marked.parse(data));

    // console.log(tokens);
    // console.log(lexer.tokenizer.rules.block); // block level rules used
    // console.log(lexer.tokenizer.rules.inline); // inline level rules used
    // console.log(marked.Lexer.rules.block); // all block level rules
    // console.log(marked.Lexer.rules.inline); // all inline level rules
});
