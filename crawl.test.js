import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test("URL with only FQDN", () => {
    expect(normalizeURL("homelinux.fi")).toBe(null);
});
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
    expect(normalizeURL("https://homelinux.fi/some/page")).toBe("homelinux.fi/some/page");
});
test("URL with query only", () => {
    expect(normalizeURL("https://homelinux.fi?query=something")).toBe("homelinux.fi?query=something");
});
test("URL with query & path", () => {
    expect(normalizeURL("https://homelinux.fi/page2/section3?query=something")).toBe(
        "homelinux.fi/page2/section3?query=something"
    );
});
