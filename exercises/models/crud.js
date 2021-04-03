const User = require('./user')

// We need to return the query each time
// For each query (where we have find we need to add the query property to say we are done)
const getUserById = (id) => {
  return User.findById(id).exec()
}

const getAllUsers = () => {
  return User.find({}).exec(); // We add an empty object to specify we want it all {}
}

const createUser = (userDetails) => {
  return User.create(userDetails)
}
const removeUserById = (id) => {
  return User.findByIdAndRemove(id).exec();
}

const updateUserById = (id, update) => {
  return User.findByIdAndUpdate(id, update, {new: true}).exec(); // We specify new true to ask to return the updated object 
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}
