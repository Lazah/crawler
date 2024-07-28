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

async function crawlPage(url) {
    let urlObj;
    try {
        urlObj = new URL(url);
        console.log(`crawling page ${urlObj.href}`);
        const resp = await fetch(urlObj, {
            method: "GET",
        });
        let status = resp.status;
        let content = await resp.text();
        let contenType = resp.headers.get("Content-Type");

        if (status >= 400) {
            console.log(`request failed with code '${resp.status}' and message ${resp.statusText}`);
            return;
        }
        if (!contenType.includes("text/html")) {
            console.log("returned content was not a HTML page: " + contenType);
            return;
        }
        console.log(content);
    } catch (error) {
        console.log(`an error occured while getting page from '${urlObj.href}': ${error.message}`);
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage };
