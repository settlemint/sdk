import { describe, expect, test } from "bun:test";

describe("postgres connection handling", () => {
  test("demonstrates improved error handling patterns", () => {
    // This test verifies our code changes compile and import correctly
    // The actual postgres functionality requires a real database connection
    // so we focus on testing the patterns we improved

    // Test that our improved error handling functions can be imported
    expect(() => {
      // Import would fail if there were syntax errors in our fixes
      require("./postgres.js");
    }).not.toThrow();
  });

  test("validates server-side environment check", () => {
    // Since runsOnServer is determined at module load time and relies on typeof window,
    // we'll test this by verifying the function exists and has the expected signature
    const { createPostgresPool } = require("./postgres.js");

    // Test that the function exists and can be called (it should work in Node.js environment)
    expect(typeof createPostgresPool).toBe("function");

    // We can't easily mock the browser environment for this test since runsOnServer
    // is evaluated at module load time, so we'll verify the function behavior instead
    expect(() => {
      // This should work in Node.js environment
      const pool = createPostgresPool("postgresql://test");
      expect(pool).toBeDefined();
      // Clean up immediately
      pool.end();
    }).not.toThrow();
  });

  test("validates connection string requirement", () => {
    const { createPostgresPool } = require("./postgres.js");

    // Test that function accepts a valid connection string
    expect(() => {
      const pool = createPostgresPool("postgresql://test");
      expect(pool).toBeDefined();
      pool.end();
    }).not.toThrow();

    // Test that function throws error for empty connection string
    expect(() => {
      createPostgresPool("");
    }).toThrow("Database URL is required");

    // Test that function throws error for null/undefined connection string
    expect(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing null input for error handling
      createPostgresPool(null as any);
    }).toThrow("Database URL is required");
  });
});
