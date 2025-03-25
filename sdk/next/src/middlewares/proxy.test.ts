import { afterEach, beforeEach, describe, expect, it, mock, spyOn } from "bun:test";
import { NextRequest, NextResponse } from "next/server.js";
import { proxyMiddleware } from "./proxy.js";

describe("proxyMiddleware", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SETTLEMINT_ACCESS_TOKEN: "sm_aat_1234567890",
      SETTLEMINT_HASURA_ADMIN_SECRET: "test-hasura-secret",
      SETTLEMINT_HASURA_ENDPOINT: "https://hasura.example.com",
      SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: "https://portal.example.com",
      SETTLEMINT_IPFS_API_ENDPOINT: "https://ipfs-api.example.com",
      SETTLEMINT_IPFS_GATEWAY_ENDPOINT: "https://ipfs-gateway.example.com",
      SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: "https://blockscout.example.com",
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: JSON.stringify([
        "https://thegraph.example.com/subgraphs/name/test-subgraph",
      ]),
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    mock.restore();
  });

  it("should return next response for non-proxy routes", () => {
    const request = new NextRequest(new URL("https://example.com/api/test"));
    const nextSpy = spyOn(NextResponse, "next");
    proxyMiddleware(request);
    expect(nextSpy).toHaveBeenCalled();
  });

  it("should add authentication headers for hasura proxy routes", () => {
    const request = new NextRequest(new URL("https://example.com/proxy/hasura"));
    const rewriteSpy = spyOn(NextResponse, "rewrite");
    proxyMiddleware(request);
    expect(rewriteSpy).toHaveBeenCalledWith(process.env.SETTLEMINT_HASURA_ENDPOINT, {
      headers: {
        "x-auth-token": process.env.SETTLEMINT_ACCESS_TOKEN,
        "x-hasura-admin-secret": process.env.SETTLEMINT_HASURA_ADMIN_SECRET,
      },
    });
  });

  it("should add authentication headers for portal proxy routes", () => {
    const request = new NextRequest(new URL("https://example.com/proxy/portal"));
    const rewriteSpy = spyOn(NextResponse, "rewrite");
    proxyMiddleware(request);
    expect(rewriteSpy).toHaveBeenCalledWith(process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT, {
      headers: {
        "x-auth-token": process.env.SETTLEMINT_ACCESS_TOKEN,
      },
    });
  });

  it("should add authentication headers for IPFS API proxy routes", () => {
    const request = new NextRequest(new URL("https://example.com/proxy/ipfs/api"));
    const rewriteSpy = spyOn(NextResponse, "rewrite");
    proxyMiddleware(request);
    expect(rewriteSpy).toHaveBeenCalledWith(process.env.SETTLEMINT_IPFS_API_ENDPOINT, {
      headers: {
        "x-auth-token": process.env.SETTLEMINT_ACCESS_TOKEN,
      },
    });
  });

  it("should add authentication headers for IPFS gateway proxy routes", () => {
    const request = new NextRequest(new URL("https://example.com/proxy/ipfs/gateway"));
    const rewriteSpy = spyOn(NextResponse, "rewrite");
    proxyMiddleware(request);
    expect(rewriteSpy).toHaveBeenCalledWith(process.env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT, {
      headers: {
        "x-auth-token": process.env.SETTLEMINT_ACCESS_TOKEN,
      },
    });
  });

  it("should add authentication headers for blockscout proxy routes", () => {
    const request = new NextRequest(new URL("https://example.com/proxy/blockscout"));
    const rewriteSpy = spyOn(NextResponse, "rewrite");
    proxyMiddleware(request);
    expect(rewriteSpy).toHaveBeenCalledWith(process.env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT, {
      headers: {
        "x-auth-token": process.env.SETTLEMINT_ACCESS_TOKEN,
      },
    });
  });

  it("should handle TheGraph proxy routes with subgraph name", () => {
    const request = new NextRequest(new URL("https://example.com/proxy/thegraph/graphql/test-subgraph"));
    const rewriteSpy = spyOn(NextResponse, "rewrite");
    proxyMiddleware(request);
    expect(rewriteSpy).toHaveBeenCalledWith(JSON.parse(process.env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS!)[0], {
      headers: {
        "x-auth-token": process.env.SETTLEMINT_ACCESS_TOKEN,
      },
    });
  });

  it("should respect disabled proxy options", () => {
    const request = new NextRequest(new URL("https://example.com/proxy/hasura"));
    const nextSpy = spyOn(NextResponse, "next");
    proxyMiddleware(request, { disableHasuraProxy: true });
    proxyMiddleware(request);
    expect(nextSpy).toHaveBeenCalled();
  });

  it("should remove authorization header if present", () => {
    const headers = new Headers();
    headers.set("authorization", "Bearer token123");
    const request = new NextRequest(new URL("https://example.com/proxy/hasura"), {
      headers,
    });
    const rewriteSpy = spyOn(NextResponse, "rewrite");
    proxyMiddleware(request);
    expect(rewriteSpy).toHaveBeenCalledWith(process.env.SETTLEMINT_HASURA_ENDPOINT, {
      headers: {
        "x-auth-token": process.env.SETTLEMINT_ACCESS_TOKEN,
        "x-hasura-admin-secret": process.env.SETTLEMINT_HASURA_ADMIN_SECRET,
      },
    });
  });
});
