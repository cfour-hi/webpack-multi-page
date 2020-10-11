module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          browsers: 'last 2 versions, > 5%, safari tp',
        },
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        shippedProposals: true,
      },
    ],
  ],
};
