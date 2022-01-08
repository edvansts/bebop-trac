const CracoLessPlugin = require("craco-less");
const CracoSassResourcesLoader = require("craco-sass-resources-loader");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "body-background": "#f2f3f5",
              "text-color": "#666666",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoSassResourcesLoader,
      options: {
        resources: ["./src/styles/mixins.scss"],
      },
    },
  ],
};
