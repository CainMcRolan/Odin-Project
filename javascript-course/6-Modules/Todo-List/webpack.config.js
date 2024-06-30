const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: {
      app: './src/main.js',
   },
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.(scss|css)$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/html/index.html',
      }),
   ],
   devtool: 'inline-source-map',
   devServer: {
      static: './dist',
   },
   optimization: {
      splitChunks: {
        chunks: 'all',
      },
   },
};