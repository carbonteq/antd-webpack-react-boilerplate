const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  devDirectory: 'dev',
  distDirectory: 'dist',
};

const generalConfig = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/transform-runtime'],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: 'css',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};

module.exports = (env) => {
  const mode = 'development';
  const outputDir = (env.production)
    ? config.distDirectory
    : config.devDirectory;

  const browserDir = 'chrome';
  const sourceDir = './src/extension';
  return [
    {
      ...generalConfig,
      mode,
      entry: {
        popup: path.resolve(__dirname, `${sourceDir}/popup/popup.jsx`),
        options: path.resolve(__dirname, `${sourceDir}/options/options.jsx`),
        content: path.resolve(__dirname, `${sourceDir}/content/content.js`),
        background: path.resolve(
          __dirname,
          `${sourceDir}/background/background.js`,
        ),
      },
      output: {
        path: path.resolve(__dirname, `${outputDir}/${browserDir}`),
        filename: '[name]/[name].js',
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Popup',
          filename: path.resolve(__dirname, `${outputDir}/${browserDir}/popup/index.html`),
          template: `${sourceDir}/popup/index.html`,
          chunks: ['popup'],
        }),
        new HtmlWebpackPlugin({
          title: 'Options',
          filename: path.resolve(__dirname, `${outputDir}/${browserDir}/options/index.html`),
          template: `${sourceDir}/options/index.html`,
          chunks: ['options'],
        }),
        new CopyWebpackPlugin([
          {
            from: `${sourceDir}/assets`,
            to: path.resolve(__dirname, `${outputDir}/${browserDir}/assets`),
          },
          {
            from: `${sourceDir}/_locales`,
            to: path.resolve(__dirname, `${outputDir}/${browserDir}/_locales`),
          },
          {
            from: `${sourceDir}/manifest.json`,
            to: path.resolve(__dirname, `${outputDir}/${browserDir}/manifest.json`),
          },
        ]),
      ],
    },
  ];
};
