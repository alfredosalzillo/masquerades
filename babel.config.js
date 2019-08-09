module.exports = {
  presets: [
    'airbnb', [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ]],
};
