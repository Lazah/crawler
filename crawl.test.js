import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("URL with HTTP proto custom port", () => {
    expect(normalizeURL("http://homelinux.fi:8080")).toBe("homelinux.fi:8080");
});
test("URL with HTTPS proto custom port", () => {
    expect(normalizeURL("https://homelinux.fi:8443")).toBe("homelinux.fi:8443");
});
test("URL with http prefix", () => {
    expect(normalizeURL("http://homelinux.fi")).toBe("homelinux.fi");
});
test("URL with https prefix", () => {
    expect(normalizeURL("https://homelinux.fi")).toBe("homelinux.fi");
});
test("URL with user name & password", () => {
    expect(normalizeURL("https://testUser:password1@homelinux.fi")).toBe("homelinux.fi");
});
test("URL with path only", () => {
    expect(normalizeURL("https://homelinux.fi/some/page/")).toBe("homelinux.fi/some/page");
});
test("URL with query only", () => {
    expect(normalizeURL("https://homelinux.fi?query=something")).toBe("homelinux.fi");
});
test("URL with query & path", () => {
    expect(normalizeURL("https://homelinux.fi/page2/section3?query=something")).toBe("homelinux.fi/page2/section3");
});

test("body with single absolute anchor", () => {
    expect(
        getURLsFromHTML(
            `<!DOCTYPE html>
<html>
</head>
<title>test page</title>
<body>
<a href="https://homelinux.fi/page2">tosi jännää</a>
</body>
</html>`,
            "https://homelinux.fi"
        )
    ).toStrictEqual(["https://homelinux.fi/page2"]);
});
test("body with single relative anchor", () => {
    expect(
        getURLsFromHTML(
            `<!DOCTYPE html>
<html>
</head>
<title>test page</title>
<body>
<a href="/page3">tosi jännää</a>
</body>
</html>`,
            "https://homelinux.fi"
        )
    ).toStrictEqual(["https://homelinux.fi/page3"]);
});
test("body with absolute & relative anchor", () => {
    expect(
        getURLsFromHTML(
            `<!DOCTYPE html>
<html>
</head>
<title>test page</title>
<body>
<a href="https://homelinux.fi/page4">tosi jännää</a>
<a href="/page5">tosi jännää</a>
</body>
</html>`,
            "https://homelinux.fi"
        )
    ).toStrictEqual(["https://homelinux.fi/page4", "https://homelinux.fi/page5"]);
});
