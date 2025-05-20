module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          '@types': './src/types',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
