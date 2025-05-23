import { mock } from "bun:test";
import { randomUUID } from "node:crypto";
import { retryWhenFailed } from "@settlemint/sdk-utils";

const GLOBAL_MOCKS: Map<
  string,
  {
    instanceRef: string;
  }
> = new Map();

type MockResult = {
  modulePath: string;
  clear: () => void;
};

/**
 * Due to an issue with Bun (https://github.com/oven-sh/bun/issues/7823), we need to manually restore mocked modules
 * after we're done. We do this by setting the mocked value to the original module.
 *
 * When setting up a test that will mock a module, the block should add this:
 * const moduleMocker = new ModuleMocker()
 *
 * afterEach(() => {
 *   moduleMocker.clear()
 * })
 *
 * When a test mocks a module, it should do it this way:
 *
 * await moduleMocker.mock('@/services/token.ts', () => ({
 *   getBucketToken: mock(() => {
 *     throw new Error('Unexpected error')
 *   })
 * }))
 * @internal
 */
export class ModuleMocker {
  private mocks: MockResult[] = [];
  private readonly instanceRef = randomUUID();

  public async mock(modulePath: string, renderMocks: () => Record<string, unknown>) {
    try {
      // Racing issues can occur between tests, so we need to retry and ensure there are no conflicting mocks between tests
      await retryWhenFailed(
        async () => {
          if (GLOBAL_MOCKS.has(modulePath)) {
            throw new Error(`Module '${modulePath}' is already mocked by another test`);
          }
        },
        5,
        10,
      );
      const original = {
        ...(await import(modulePath)),
      };
      const mocks = renderMocks();
      const result = {
        ...original,
        ...mocks,
      };
      mock.module(modulePath, () => result);
      GLOBAL_MOCKS.set(modulePath, {
        instanceRef: this.instanceRef,
      });
      this.mocks.push({
        modulePath,
        clear: () => {
          const globalMock = GLOBAL_MOCKS.get(modulePath);
          if (globalMock?.instanceRef === this.instanceRef) {
            mock.module(modulePath, () => original);
            GLOBAL_MOCKS.delete(modulePath);
          }
        },
      });
    } catch (error) {
      console.error(`Error mocking module ${modulePath}:`, error);
    }
  }

  public clear(modulePath?: string) {
    for (const mockResult of this.mocks) {
      if (modulePath && mockResult.modulePath !== modulePath) {
        continue;
      }
      mockResult.clear();
    }
    this.mocks = modulePath ? this.mocks.filter((mock) => mock.modulePath !== modulePath) : [];
  }
}
