import type { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { createRouteMatcher } from "./route-matcher";

const createMockRequest = (pathname: string): NextRequest => {
  return {
    nextUrl: { pathname },
  } as NextRequest;
};

describe("createRouteMatcher", () => {
  const createMockRequest = (pathname: string): NextRequest => {
    return {
      nextUrl: { pathname },
    } as NextRequest;
  };

  it("should match a single string route", () => {
    const matcher = createRouteMatcher("/foo");
    expect(matcher(createMockRequest("/foo"))).toBe(true);
    expect(matcher(createMockRequest("/bar"))).toBe(false);
  });

  it("should match multiple string routes", () => {
    const matcher = createRouteMatcher(["/foo", "/bar"]);
    expect(matcher(createMockRequest("/foo"))).toBe(true);
    expect(matcher(createMockRequest("/bar"))).toBe(true);
    expect(matcher(createMockRequest("/baz"))).toBe(false);
  });

  it("should match regex routes", () => {
    const matcher = createRouteMatcher(/^\/foo\/.*$/);
    expect(matcher(createMockRequest("/foo/bar"))).toBe(true);
    expect(matcher(createMockRequest("/foo/baz"))).toBe(true);
    expect(matcher(createMockRequest("/bar/foo"))).toBe(false);
  });

  it("should match mixed string and regex routes", () => {
    const matcher = createRouteMatcher(["/foo", /^\/bar\/.*$/]);
    expect(matcher(createMockRequest("/foo"))).toBe(true);
    expect(matcher(createMockRequest("/bar/baz"))).toBe(true);
    expect(matcher(createMockRequest("/baz"))).toBe(false);
  });

  it("should match routes with wildcards", () => {
    const matcher = createRouteMatcher("/foo(.*)");
    expect(matcher(createMockRequest("/foo"))).toBe(true);
    expect(matcher(createMockRequest("/foo/bar"))).toBe(true);
    expect(matcher(createMockRequest("/bar"))).toBe(false);
  });

  it("should handle function matchers", () => {
    const matcher = createRouteMatcher((req: NextRequest) => req.nextUrl.pathname.startsWith("/api"));
    expect(matcher(createMockRequest("/api/users"))).toBe(true);
    expect(matcher(createMockRequest("/app/dashboard"))).toBe(false);
  });

  it("should handle empty input", () => {
    const matcher = createRouteMatcher([]);
    expect(matcher(createMockRequest("/any/path"))).toBe(false);
  });

  it("should throw an error for invalid path patterns", () => {
    expect(() => createRouteMatcher("(invalid")).toThrow("Invalid path");
  });
});

describe("paths utility", () => {
  it("should convert valid paths to regex", () => {
    const matcher = createRouteMatcher("/user/:id");
    expect(matcher(createMockRequest("/user/123"))).toBe(true);
    expect(matcher(createMockRequest("/user/abc"))).toBe(true);
    expect(matcher(createMockRequest("/user"))).toBe(false);
  });
});
