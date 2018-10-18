'use strict';

module.exports = function enableAuthentication(server) {
  const ds = server.dataSources.db;

  const models = [
    'ACL',
    'AccessToken',
    'profile',
    'accepted',
    'rejected',
  ];

  ds.setMaxListeners(Infinity);

  ds.autoupdate(models, function(err) {
    if (err) throw err;
    console.log('Tables [' + models + '] created in ', ds.adapter.name);
  });
}
