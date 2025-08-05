const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    "mfeRemote": 'https://mfe-navbar-byhfgzhsf4dmdkdc.canadacentral-01.azurewebsites.net/remoteEntry.js',
    "mfeHome": 'https://mfe-home-hwcqe3hgg4avhbbe.canadacentral-01.azurewebsites.net/remoteEntry.js',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  }
});
