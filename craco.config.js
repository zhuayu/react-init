const path = require("path");
const CracoLessPlugin = require('craco-less');

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  webpack: {
    alias: {
      '@': path.join(path.resolve(__dirname, './src')),
    } 
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#35b558' 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};