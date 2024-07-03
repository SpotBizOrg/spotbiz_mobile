const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return mergeConfig(defaultConfig, {
    resolver: {
      assetExts: [...defaultConfig.resolver.assetExts, 'env'],
      sourceExts: [...defaultConfig.resolver.sourceExts, 'env', 'json'],
    },
  });
};
