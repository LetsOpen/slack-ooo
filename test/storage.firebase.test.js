const test = require('tape');
const Firebase = require(`${process.env.PWD}/lib/storage/firebase`);

// load env variables
require('dotenv').config();

const config = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL
};

const fb = new Firebase(config);

test('Storage/Firebase: Sets config', (assert) => {
  assert.deepEqual(fb.config, config, 'Config should be set in new class');

  try {
    const failFB = new Firebase();
    assert.notOk(failFB, 'Should throw error if config is not set');
  } catch (err) {
    assert.ok(err, 'Should throw error if config is not set');
  }
  assert.end();
});

test('Storage/Firebase: Store/Retrieve Users', (assert) => {
  const username = 'test';
  const user = {
    foo: 'bar'
  };
  const newUser = {
    bar: 'foo'
  };

  fb.deleteUser(username)
    .then(() => {
      fb.setUser(username, user)
        .then((savedUser) => {
          assert.deepEqual(user, savedUser, 'Should save user');
          return fb.getUser(username);
        })
        .then((gottenUser) => {
          assert.deepEqual(user, gottenUser, 'Should fetch user');
          return fb.setUser(username, newUser);
        })
        .then((savedNewUser) => {
          assert.deepEqual(newUser, savedNewUser, 'Should fetch new overwritten user');
        });

      fb.getUser('na')
        .then((noUser) => {
          assert.deepEqual(noUser, {}, 'Should get empty object when there is no user');
        });
    });
  assert.end();
});
