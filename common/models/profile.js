'use strict';

module.exports = function(Profile) {
  Profile.propositions = function (profileid, cb) {

  var ds = Profile.dataSource;
  var sql = "SELECT * FROM profile p WHERE p.old <> (SELECT old from profile WHERE id = " + profileid + " ) AND p.id NOT IN (SELECT passifId FROM rejected WHERE actifId = " + profileid + " ) AND p.id NOT IN (SELECT passifId FROM accepted WHERE actifId = " + profileid + " )AND p.profileId IS NULL LIMIT 1";

  ds.connector.query(sql, function (err, result) {

      if (err) console.error(err);

      cb(err, result);

  });

};

Profile.remoteMethod(
  'propositions',
  {
      http: { verb: 'get' },
      description: 'test',
      accepts: { arg: 'profileid', type: 'string' },
      returns: { arg: 'data', type: ['Profile'], root: true }
  }
);
};
