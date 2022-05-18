const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const uploadFile = require("../middlewares/multerMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");

// Modificar para vista solo de usuarios
router.get("/", usersController.index);
router.get("/create", usersController.create);
router.post("/register", usersController.register);
router.post("/login", usersController.loginProcess);
router.post("/create", uploadFile.single("image"), usersController.store);

// Logout
router.get("/logout/", usersController.logout);

// Perfil & Update user
router.get("/profile", authMiddleware, usersController.profile);
router.get("/edit/:id", usersController.edit);

// Edit & delete user
router.put("/update/:id", uploadFile.single("image"), usersController.update);
router.delete("/delete/:id", usersController.delete);

module.exports = router;
