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

export { normalizeURL };
