const data = require("../db/data");
const bcrypt = require('bcryptjs')
const db = require("../database/models");
const op = db.Sequelize.Op;
const users = db.Users //user es el alias de la base de datos

const userController = {
    register: function(req, res){
        return res.render("register");
    },
    login: function(req, res){
        return res.render("login");
    },
    profile: function(req, res) {
        return res.render("profile", {data: data});
    },
    profileEdit: function(req, res) {
        return res.render("profile-edit", {data: data});
    },
    registerProcess: function(req, res) {
        const errors = {}
        if(req.body.email == ""){
            errors.message = "El email es obligatorio";
            res.locals.errors = errors;
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if(req.body.password == ""){
            errors.message = "La contraseña es obligatoria";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
            errors.message = "El archivo debe ser jpg o png";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if(req.body.user == "") {
            errors.message = "El nombre de usuario es obligatorio"
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else {
            users.findOne({
                where: [{email: req.body.email}]
            })
            .then(function(user){
                if(user != null){
                    errors.message = "El email ya esta registrado por favor elija otro";
                    console.log(errors) // Guardar errors en locals
                    return res.render('register')
                } else {
                    let usuario = {
                        user: req.body.user,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        fecha_nacimiento: req.body.fecha_nacimiento,
                        image_profile: req.file.filename
                    }
                    users.create(usuario)
                        .then(user => {
                            return res.redirect('/login')
                        })
                        .catch(e=>{
                            console.log(e)
                        })
                }
            }
            )
        }
    }
}


module.exports = userController;