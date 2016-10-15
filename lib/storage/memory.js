const Storage = require('./storage').interface;

/**
 * @module Memory
 */
class Memory extends Storage {
  /**
   * @constructor
   * @param {Object} config Any configuration for the object
   */
  constructor (config) {
    super(config);

    this.users = new Map();
  }

  /**
   * Getters
   */

  /**
   * Gets the user object for the particular username
   * @param {string} username
   * @return {Promise} A promise that is resolved with the user object of the username
   *                   or empty object if the user object does not
   *                   The promise is rejected if there is a storage issue
   */
  getUser (username) {
    return new Promise((resolve) => {
      resolve(this.users.get(username) || {});
    });
  }

  /**
   * Setters
   */

  /**
   * Sets user data, this will overwrite the entire user object for the
   * particular username
   * @param {string} username
   * @param {object} OOO_User object
   * @return {Promise} A promise that is resolved with the user object of the username
   *                   or empty object if the user object does not
   *                   The promise is rejected if there is a storage issue
   */
  setUser (username, user) {
    return new Promise((resolve) => {
      this.users.set(username, user);
      resolve(user);
    });
  }
}

module.exports = Memory;
