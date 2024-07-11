const router = require("express").Router();
const UserController = require("../controller/UserController");
const upload = require('../config/multer');
const middlewareController = require('../middleware/middlewareController')


router.get("/get-all", UserController.getAllUser);
router.post("/create-new", middlewareController.verifyToken, upload.single('file'), UserController.createUser);
router.put("/update/:id", middlewareController.verifyToken, upload.single('file'), UserController.updateUser);
router.delete("/:id", middlewareController.verifyToken, UserController.deleteUser);
router.get("/search", UserController.searchUser);


module.exports = router;
