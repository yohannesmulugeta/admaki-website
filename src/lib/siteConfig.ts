export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://admakidigital.com'
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
