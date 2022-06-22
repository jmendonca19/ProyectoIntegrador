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
/* en el upload.single('nameDelInput') */
router.post("/register", upload.single('image_profile'), userController.registerProcess)

router.get("/login", userController.login)
router.post("/login", userController.loginStore)

router.get("/profile/:id", userController.profile);

router.get("/profile-edit/:id", userController.profileEdit);
router.post('/profile-edit/profileStore', upload.single('image_profile'), userController.profileStore)

router.post("/logout", userController.logout)

router.get('/seguir/id/:id' , userController.seguir);

module.exports = router;