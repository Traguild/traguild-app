module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-reanimated/plugin"],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            components: "./src/components",
            hooks: "./src/hooks",
            layouts: "./src/layouts",
            resources: "./src/resources",
            views: "./src/views",
            config: "./src/config",
            assets: "./assets",
          },
        },
      ],
    ],
  };
};
