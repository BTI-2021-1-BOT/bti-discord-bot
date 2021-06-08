function hasRole(roles, searchRole) {
  return roles.some((role) => searchRole === role);
}

module.exports = {
  hasRole,
};
