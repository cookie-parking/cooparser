const config = [];

function generateConfig(name) {
  const compress = name.indexOf('min') > -1;
  const config = {
    /** @type {import('webpack').Configuration} */
    target: 'node',
    entry: './lib/index.ts',
    output: {
      path: __dirname + '/dist/',
      filename: name + '.js',
      library: 'cooparser',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'this',
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    mode: compress ? 'production' : 'development'
  };
  return config;
}

['cooparser', 'cooparser.min'].forEach((key) => {
  config.push(generateConfig(key));
});

module.exports = config;