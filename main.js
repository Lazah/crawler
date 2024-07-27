import { argv } from "node:process";
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
}

main();
