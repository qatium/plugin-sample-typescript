# Qatium Sample plugin in Vanilla Typescript

This sample is a skeleton project of a Qatium plugin. Using it, you can extend Qatium's functionality and its user interface.

## Running the plugin

Start the development server
```bash
npm install
npm run dev
```

Open Qatium in developer mode to see your changes, to do so:
- Open the Qatium web app
- Open a network and wait for it to load
- Open your user menu clicking in your avatar, then open the developer mode settings and click the “Activate” toggle

You should see your new plugin in the right side panel.


## Running tests

Tests are written using @qatium/sdk-testing-library. You can run the tests using `npm run test` command. A test example is in the `plugin/engine.test.ts` file.