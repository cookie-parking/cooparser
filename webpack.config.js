const config = [];

function generateConfig(name) {
  const compress = name.indexOf('min') > -1;
  const config = {
    entry: './lib/index.ts',
    output: {
      globalObject: 'this',
      path: __dirname + '/dist/',
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'cooparser',
      libraryTarget: 'umd'
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'awesome-typescript-loader' },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    devtool: 'source-map',
    mode: compress ? 'production' : 'development'
  };
  return config;
}



['cooparser', 'cooparser.min'].forEach((key) => {
  config.push(generateConfig(key));
});

module.exports = config;