import { JSDOM } from "jsdom";
function normalizeURL(url) {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.endsWith("/")) {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
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

async function crawlPage(baseUrl, currentUrl = baseUrl, pages = {}) {
    let curUrlObj;
    let baseUrlObj;
    try {
        curUrlObj = new URL(currentUrl);
        baseUrlObj = new URL(baseUrl);
        console.log(`crawling page ${curUrlObj.href}`);
        if (curUrlObj.hostname !== baseUrlObj.hostname) {
            return pages;
        }
        const curUrlText = normalizeURL(curUrlObj);
        if (pages[curUrlText] !== undefined) {
            pages[curUrlText]++;
            return pages;
        }
        pages[curUrlText] = 1;
        const anchors = await getPageLinks(baseUrlObj, curUrlObj);
        for (const url of anchors) {
            pages = await crawlPage(baseUrlObj, url, pages);
        }
    } catch (error) {
        console.log(`an error occured while crawling page '${curUrlObj.href}': ${error.message}`);
    }
    return pages;
}
async function getPageLinks(baseUrl, currUrl) {
    let resp;
    try {
        console.log(`fetching page '${currUrl.href}'`);
        resp = await fetch(currUrl, {
            method: "GET",
        });
    } catch (error) {
        console.log(`an error occured while fetching page '${currUrl.href}': ${error.message}`);
        return [];
    }
    const contenType = resp.headers.get("Content-Type");

    if (resp.status >= 400) {
        console.log(`request failed with code '${resp.status}' and message ${resp.statusText}`);
        return [];
    }
    if (!contenType.includes("text/html")) {
        console.log("returned content was not a HTML page: " + contenType);
        return [];
    }
    return getURLsFromHTML(await resp.text(), `${baseUrl.protocol}//${baseUrl.host}`);
}

export { normalizeURL, getURLsFromHTML, crawlPage };
