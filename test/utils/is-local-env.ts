import * as url from 'url';

export function isLocalEnv(): boolean {
  const allowedHosts = [
    'console.k8s.orb.local',
    'settlemint.be'
  ];

  const instanceUrl = process.env.SETTLEMINT_INSTANCE ?? "";
  const parsedUrl = url.parse(instanceUrl);
  const host = parsedUrl.host ?? "";

  return (
    allowedHosts.includes(host) ||
    /^https:\/\/[a-z]+?\.settlemint\.be/i.test(instanceUrl) ||
    false
  );
}
