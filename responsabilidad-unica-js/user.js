function createUser(name, lastname) {
  return { userId: Math.floor(Math.random() * 1000000 + 1), name, lastname };
}

function getFullname(name, lastname) {
  return `${name} ${lastname}`.toUpperCase();
}

module.exports = {
  createUser,
  getFullname,
};
