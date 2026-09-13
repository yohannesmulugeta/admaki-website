const repositoryParts = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const githubOwner = repositoryParts[0];
const githubRepository = repositoryParts[1];

const githubPagesUrl =
  process.env.GITHUB_ACTIONS && githubOwner && githubRepository
    ? `https://${githubOwner}.github.io/${githubRepository}`
    : undefined;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  githubPagesUrl ||
  'https://admaki.com'
).replace(/\/$/, '');

export function withBasePath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (basePath && path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

export function absoluteAssetUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
