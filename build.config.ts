import { LibraryFormats, build, createServer, InlineConfig } from "vite";
import { rimrafSync } from "rimraf";
import { viteSingleFile } from "vite-plugin-singlefile";
import { parseArgs } from "util";

const {
  values: { dev: isDev }
} = parseArgs({
  args: process.argv,
  options: {
    dev: {
      type: "boolean"
    },
    build: {
      type: "boolean"
    }
  },
  allowPositionals: true
});

const pluginConfig: InlineConfig = {
  build: {
    emptyOutDir: false,
    outDir: "./metadata",
    lib: {
      entry: "./src/plugin/index.ts",
      fileName: "plugin",
      formats: ["es"] as LibraryFormats[]
    }
  }
};

const panelConfig: InlineConfig = {
  root: "./src/panel",
  publicDir: "../../metadata",
  build: {
    outDir: "../../dist",
    emptyOutDir: false
  },
  plugins: [
    viteSingleFile(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Access-Control-Request-Private-Network", "true");
          res.setHeader("Access-Control-Allow-Private-Network", "true");
          res.setHeader("Access-Control-Expose-Headers", "ETag");
          next();
        });
      }
    }
  ],
  server: {
    port: 8888,
    cors: {
      origin: [
        "https://qatium.app",
        "http://localhost:8888",
        "http://localhost:3000",
        "null"
      ],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 204
    }
  }
};

(async () => {
  rimrafSync("./metadata/plugin.js");
  rimrafSync("./dist");

  if (isDev) {
    pluginConfig.build!.watch = {};
  }

  await build(pluginConfig);

  await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

  if (isDev) {
    const server = await createServer(panelConfig);

    await server.listen();
    server.printUrls();
    server.bindCLIShortcuts({ print: true });
  } else {
    await build(panelConfig);
  }
})();
