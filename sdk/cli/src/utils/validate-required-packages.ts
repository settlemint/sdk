import { isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import { cancel } from "@settlemint/sdk-utils/terminal";

export const validateIfRequiredPackagesAreInstalled = async (packages: string[], cwd?: string) => {
  const results = await Promise.all(
    packages.map(async (pkg) => {
      try {
        const isInstalled = await isPackageInstalled(pkg, cwd);
        return { packageName: pkg, isInstalled };
      } catch (err) {
        return { packageName: pkg, isInstalled: false };
      }
    }),
  );
  const notInstalled = results.filter((result) => !result.isInstalled);
  if (notInstalled.length > 0) {
    cancel(
      `The following required npm packages are not installed: ${notInstalled.map((pkg) => pkg.packageName).join(", ")}. Please install them and try again.`,
    );
  }
};
