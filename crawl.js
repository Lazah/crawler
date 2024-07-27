import { JSDOM } from "jsdom";
function normalizeURL(url) {
    let finalUrl;
    try {
        const urlObj = new URL(url);
        finalUrl = urlObj.hostname;
        if (urlObj.port !== "") {
            finalUrl += `:${urlObj.port}`;
        }
        if (urlObj.pathname !== "/") {
            finalUrl += urlObj.pathname;
        }
        if (urlObj.search !== "") {
            finalUrl += urlObj.search;
        }
    } catch (err) {
        console.log(`an error occured while parsing the url: ${err.message}`);
        finalUrl = null;
    }

    return finalUrl;
}

function getURLsFromHTML(body, baseURL) {
    let returnValues = [];
    try {
        const dom = new JSDOM(body);
        const links = dom.window.document.querySelectorAll("a");
        if (links === undefined) {
            throw new Error("didn't find any links");
        }
        links.forEach((link) => {
            if (link.hostname !== "") {
                returnValues.push(link.href);
                return;
            }
            returnValues.push(`${baseURL}${link.href}`);
        });
    } catch (err) {
        console.log(`an error occured while getting links from page: ${err.message}`);
        returnValues = [];
    }

    return returnValues;
}

export { normalizeURL, getURLsFromHTML };
