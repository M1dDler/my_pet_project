import { createJiti } from "jiti";

// env validation
const jiti = createJiti(import.meta.url);
await jiti.import("./src/env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
