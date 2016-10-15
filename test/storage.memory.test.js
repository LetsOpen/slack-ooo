const test = require('tape');
const Memory = require(`${process.env.PWD}/lib/storage/memory`);

test('Storage/Memory: Sets config', (assert) => {
  const config = {
    foo: 'bar'
  };

  const mem = new Memory(config);
  assert.deepEqual(mem.config, config, 'Config should be set in new class');
  assert.end();
});

test('Storage/Memory: Store/Retrieve Users', (assert) => {
  const username = 'test';
  const user = {
    foo: 'bar'
  };
  const newUser = {
    bar: 'foo'
  };

  const mem = new Memory();
  mem.setUser(username, user)
    .then((savedUser) => {
      assert.deepEqual(user, savedUser, 'Should save user');
      return mem.getUser(username);
    })
    .then((gottenUser) => {
      assert.deepEqual(user, gottenUser, 'Should fetch user');
      return mem.setUser(username, newUser);
    })
    .then((savedNewUser) => {
      assert.deepEqual(newUser, savedNewUser, 'Should fetch new overwritten user');
    });
  mem.getUser('na')
    .then((noUser) => {
      assert.deepEqual(noUser, {}, 'Should get empty object when there is no user');
    });
  assert.end();
});
