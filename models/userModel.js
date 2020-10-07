const connection = require('../connection');

function validateEmail (email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function validatePassword (password) {
  const passwordRegex = /^\d+$/;
  return passwordRegex.test(password);
}

const validateRole = (validRoles) => (role) => {
  return validRoles.includes(role);
};

const validateUser = (validRoles) => (username, email, password, role) => {
  return validateEmail(email)
    && validatePassword(password)
    && validateRole(role, validRoles);
};

const create = (db) => async (username, email, password, role) => {
  const result = await db
    .getTable('users')
    .insert(['username', 'email', 'password', 'role'])
    .values(username, email, password, role)
    .execute();

  const id = result.getAutoIncrementValue();

  return {
    id,
    username,
    email,
    role
  };
};

const factory = (db, validRoles) => ({
  validateEmail,
  validatePassword,
  validateRole: validateRole(validRoles),
  validateUser: validateUser(validRoles),
  create: create(db)
});

module.exports = {
  factory,
  validateEmail,
  validatePassword,
  validateRole,
  validateUser,
  create
};