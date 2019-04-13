let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  CleanWebpackPlugin = require('clean-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
console.log("process.env", process.env)

      module.exports = {
        mode: 'production',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main-[hash].js'
          },
          module: {
              rules: [
                {
                  test: /\.css$/,
                  exclude: /node_modules/,
                  use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader'
                  ]
                }
              ]
            },
            optimization: {
              minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserJSPlugin({})],
            },
          plugins: [
            new HtmlWebpackPlugin({
              filename: 'index.html',
              template: 'index.html',
              inject: true,
             minify: {
            collapseWhitespace: true,
            removeComments: true
              }
            },
          ),
          new MiniCssExtractPlugin( {
            filename: 'style-[hash].css'
          }),
          new CleanWebpackPlugin(),
          ]
      }
      //console.log(path)
