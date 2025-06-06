import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

/*     react({
      jsxImportSource:
        mode === "development"
          ? "@welldone-software/why-did-you-render"
          : "react",
    }); */

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:8080`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
