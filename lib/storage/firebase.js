const firebase = require('firebase');
const Storage = require('./storage').interface;

const KEY_USERS = 'users';

/**
 * @module Firebase
 */
class Firebase extends Storage {
  /**
   * @constructor
   * @param {Object} config Any configuration for the Object
   */
  constructor (config) {
    super(config);

    if (!config || !config.databaseURL) {
      throw new Error('Missing Firebase Database URL');
    }

    // initialize app
    firebase.initializeApp(config);
    this.root = firebase.database().ref('/');
    this.users = this.root.child(KEY_USERS);
  }

  /**
   * Getters
   */

  /**
   * Get user object for the username
   * @param {string} username
   * @return {Promise} A promise that is resolved with the user object
   *                   or empty object for no user
   *                   The promise is rejected if there is a storage issue
   */
  getUser (username) {
    return new Promise((resolve, reject) => {
      this.users.child(username).once('value')
        .then((user) => {
          resolve(user.val() || {});
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Setters
   */

  /**
   * Sets user object for a username
   * @param {string} username
   * @param {object} user OOOUser object
   * @return {Promise} A promise that is resolved with the user object
   *                   or empty object for no user
   *                   The promise is rejected if there is a storage issue
   */
  setUser (username, user) {
    return new Promise((resolve, reject) => {
      this.users.child(username).set(user)
        .then((err) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

   /**
   * Empties data for a username
   * @param {string} username
   * @return {Promise} A promise that is resolved with a truthy value
   *                   The promise is rejected if there is a storage issue
   */
  deleteUser (username) {
    return new Promise((resolve, reject) => {
      this.users.child(username).remove()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Firebase;
