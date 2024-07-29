const withTM = require('next-transpile-modules')(['react-native']);

module.exports = withTM({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules\/(?!react-native)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            'module:metro-react-native-babel-preset'
          ]
        }
      }
    });
    return config;
  }
});
