const config = [];

function generateConfig(name) {
  const compress = name.indexOf('min') > -1;
  const config = {
    entry: './lib/index.ts',
    externals: {
      axios: 'axios'
    },
    output: {
      path: __dirname + '/dist/',
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'cooparser',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
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