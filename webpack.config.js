const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.ts',
    content :"./src/content.ts"
   
   
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean:true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
