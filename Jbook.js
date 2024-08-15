let fs = require("node:fs");
let marked = require("marked");


fs.readFile(__dirname + "/demo1.txt", "utf-8", (err, data) => {
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
            const text = (this.parser.parseInline(tokens).replace(/ /g, "_"));

            return `
<h${depth} id="${text}">
    <a href="#${text}">${text}</a>
</h${depth}>`;
        },
    };

    marked.use({ renderer });
    console.log(marked.parse(data));

    // console.log(tokens);
    // console.log(lexer.tokenizer.rules.block); // block level rules used
    // console.log(lexer.tokenizer.rules.inline); // inline level rules used
    // console.log(marked.Lexer.rules.block); // all block level rules
    // console.log(marked.Lexer.rules.inline); // all inline level rules
});
