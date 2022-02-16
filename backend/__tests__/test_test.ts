const newman = require('newman');
const path = require('path');

var basepath = path.resolve("./");

test('testing get all users endpoint', () => {
  newman.run({
    collection: basepath + '/collections/Users.json',
    reporters: 'cli'
    }, function (err, summary) {
        if (err) {
          throw err;
        }
  })
 });
