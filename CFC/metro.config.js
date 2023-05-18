const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
    const {
      resolver: { sourceExts, assetExts }
    } = await getDefaultConfig();
    return {
      transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer")
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...sourceExts, 'jsx','cjc', 'js', 'json', 'ts', 'tsx', 'module.scss', 'svg'],
        extraNodeModules: {
          '@env': `${__dirname}/.env`,
        },
      }
    };
  })();
