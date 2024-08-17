let fs = require("node:fs");
let marked = require("marked");

const lexer = new marked.Lexer();
const renderer = new marked.Renderer();

let navData = [];

// const tokens = lexer.lex(data, {
//     async: true,
//     pedantic: false,
//     gfm: true,
// });



const updateFile = (data, navData, inputFile, outputFile) => {
    fs.readFile(__dirname + "/" + inputFile, "utf-8", (err, templateData) => {

        data = templateData.replace("{{{index}}}", data).replace("{{{nav}}}", navData);;
        // navData = templateData.replace("{{{nav}}}", navData)
        fs.writeFile(__dirname + "/output/" + outputFile, data, (err) => {
            if (err) {
                console.error("Error writing to file")
            }
        })
    })

}

fs.readFile(__dirname + "/markdown.md", "utf-8", (err, data) => {
    if (err) {
        console.log("Markdown file read error"); 
        return 0;
    }

    renderer.heading = (text) => {
        if (text.depth == 1) {
            let navString = `<a href="#${text.text.replace(/ /g, "_")}">${text.text}</a>`
            navData.push(navString);
            console.log(text.raw)
        }
        

        return `<h${text.depth} id="${text.text.replace(/ /g, "_")}">${text.text}</h${text.depth}>`;
    }
    


    
    marked.use({ renderer });
    const htmlOutput = marked.parse(data);

    // navData.forEach(() => {
    //   console.log()
    // });
    console.log(navData)
    updateFile(htmlOutput, navData.join(" "), "template.html", "index.html")
    // for (let key in navData) {
    //     console.log(navData["raw"]);
    // }

    
 });
