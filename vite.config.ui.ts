import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"
import { ViteEjsPlugin } from "vite-plugin-ejs";

export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: false
    },
    plugins: [viteSingleFile(), ViteEjsPlugin(), {
      name: "configure-response-headers",
      configureServer: server => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Access-Control-Request-Private-Network", "true");
          res.setHeader("Access-Control-Allow-Private-Network", "true");
          next();
        });
      }
    }],
    server: {
      port: 8888,
      cors: {
        origin: ["https://qatium.app", "http://localhost:8888", "http://localhost:3000", "null"],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 204
      }
    }
  };
});