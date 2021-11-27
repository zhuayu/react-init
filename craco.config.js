const path = require("path");
const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  webpack: {
    alias: {
      '@src': path.join(path.resolve(__dirname, './src')),
      '@views': path.join(path.resolve(__dirname, './src/views')),
      '@assets': path.join(path.resolve(__dirname, './src/assets')),
      '@store': path.join(path.resolve(__dirname, './src/store')),
      '@style': path.join(path.resolve(__dirname, './src/style')),
      '@components': path.join(path.resolve(__dirname, './src/components')),
      '~assets': path.join(path.resolve(__dirname, './src/assets'))
    },
    plugins: {
      add: [
        new AntdDayjsWebpackPlugin({
          preset: 'antdv4'
        })
      ]
    }
  },
  jest: {
    configure: {
      "testEnvironment": "node",
      "transformIgnorePatterns": [
        "/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$"
      ],
      "coveragePathIgnorePatterns": [
        "<rootDir>/src/global",
      ],
      "moduleNameMapper": {
        "^@src(.*)$": "<rootDir>/src$1",
        "^@store(.*)$": "<rootDir>/src/store$1",
        "^@components(.*)$": "<rootDir>/src/components$1",
        "^@assets(.*)$": "<rootDir>/src/assets$1",
      }
    },
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