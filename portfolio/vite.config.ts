import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
// NOTE!
  // - If your repo is EXACTLY username.github.io => base should be "/"
  // - Otherwise => base should be "/REPO_NAME/"
  // We let the GitHub Action pass BASE_PATH, but default to "/".
  const base = process.env.BASE_PATH ?? "/";

  return {
    plugins: [react()],
    base,
  };
});
