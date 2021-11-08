const { createUser, getUserByUserId, getUsers, updateUser, deleteUser, login } = require("./user.controller");
const router = require("express").Router();

router.post('/addUser', createUser);
router.get('/getUsers', getUsers);
router.get('/getUserById/:id', getUserByUserId);
router.patch('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);
router.post('/login', login);

module.exports = router;