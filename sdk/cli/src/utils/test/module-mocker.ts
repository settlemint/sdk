import { mock } from "bun:test";

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

  public async mock(modulePath: string, renderMocks: () => Record<string, unknown>) {
    try {
      if (this.mocks.some((mock) => mock.modulePath === modulePath)) {
        throw new Error(`Module '${modulePath}' is already mocked`);
      }
      const original = {
        ...(await import(modulePath)),
      };
      const mocks = renderMocks();
      const result = {
        ...original,
        ...mocks,
      };
      mock.module(modulePath, () => result);

      this.mocks.push({
        modulePath,
        clear: () => {
          mock.module(modulePath, () => original);
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
