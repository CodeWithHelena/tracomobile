module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      //'nativewind/babel',
      'react-native-reanimated/plugin', // Only if you use Reanimated v4
    ],
  };
};