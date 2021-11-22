const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "body-background": "#f2f3f5",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};