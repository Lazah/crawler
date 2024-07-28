import { argv } from "node:process";
import { crawlPage } from "./crawl.js";
function main() {
    if (argv.length < 3) {
        console.log("ERROR: program needs one argument");
        return 10;
    }
    if (argv.length > 3) {
        console.log("ERROR: too many arguments");
        return 11;
    }
    const baseURL = argv[2];
    console.log("Starting web crawling from " + baseURL);
    crawlPage(baseURL)
        .then((val) => {
            console.log(JSON.stringify(val));
        })
        .catch((msg) => {
            console.log(`page crawling failed with message: ${msg}`);
        });
}

main();
