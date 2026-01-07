const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfeRemote": "http://localhost:4201/remoteEntry.js",
    "mfeHome": "http://localhost:4202/remoteEntry.js",
    "mfeLogin": 'http://localhost:4203/remoteEntry.js', 
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
