const router = require("express").Router();
const UserController = require("../controller/UserController");
const upload = require('../config/multer');


router.get("/get-all",UserController.getAllUser);
router.post("/create-new", upload.single('file'), UserController.createUser);
router.put("/update/:id", upload.single('file'), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);


module.exports = router;
