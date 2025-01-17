/**
 * Extracts the region name from a region ID by removing the provider prefix
 *
 * @param regionId - The full region ID (e.g. 'gke-europe')
 * @returns The region name without the provider prefix (e.g. 'europe')
 */
export function getRegionId(regionId: string) {
  return regionId.split("-")[1];
}
