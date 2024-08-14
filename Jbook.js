let fs = require("node:fs");
let marked = require('marked');

fs.readFile("dmo.txt", "utf-8", (err, data) => {

    if (err) {
        console.log("File read error")
        return 0
    }

    console.log(data)
})