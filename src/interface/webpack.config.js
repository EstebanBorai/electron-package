const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

const paths = {
  interface: (p) => path.join(__dirname, p)
};

module.exports = (env, args) => ({
  entry: paths.interface('app/index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bundle')
  },
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  devServer: {
    contentBase: paths.interface(''),
    compress: true,
    port: 8080,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Electron Boilerplate',
      template: paths.interface('app/index.ejs')
    }),
    new HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      assets: path.resolve(__dirname, 'assets'),
    }
  }
});
