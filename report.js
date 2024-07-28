function printReport(pages) {
    const sortedPages = sortPages(pages);
    console.log("====================");
    console.log("REPORT");
    console.log("====================");
    for (const tuple of sortedPages) {
        let count = tuple[1];
        let link = tuple[0];
        console.log(`Found ${count} internal links to ${link}`);
    }
}

// sortPages sorts a dictionary of pages
// into a list of tuples (url, count)
// with the highest counts first in the list
function sortPages(pages) {
    // 2D array where the
    // inner array: [ url, count ]
    const pagesArr = Object.entries(pages);
    pagesArr.sort((pageA, pageB) => {
        if (pageB[1] === pageA[1]) {
            return pageA[0].localeCompare(pageB[0]);
        }
        return pageB[1] - pageA[1];
    });
    return pagesArr;
}

export { printReport, sortPages };
