var express = require('express');
let router = express.Router();
let multer = require('multer');
let path = require('path');
const userController = require("../controllers/userController")

// Configurar Multer.
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/users'))
    },  // donde se suben los archivos
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }      // Nombre del archivo
})

let upload = multer({storage: storage});

router.get("/register", userController.register)
router.get("/login", userController.login)
router.post("/login", userController.loginStore)
router.get("/profile", userController.profile);
router.get("/profile-edit", userController.profileEdit);
router.post("/register", upload.single('image_profile'), userController.registerProcess)

module.exports = router;