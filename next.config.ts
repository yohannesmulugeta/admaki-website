import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions) {
  const repoName = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "admaki-website";
  repo = `/${repoName}`;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? repo : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
