module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./__tests__'],
          '@components': './src/components',
          '@screens': './src/screens',
          '@router': './src/router',
          '@typings': './src/typings',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
