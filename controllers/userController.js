import { hashSync, compareSync } from 'bcryptjs';
import { Users, Seguidor, Sequelize } from "../database/models";
const users = Users //user es el alias del modelo
const Seguidores = Seguidor; 
const Op = Sequelize.Op; //* Da la posibilidad de trabajar con operadores

const userController = {
    register: function(req, res){
        return res.render("register");
    },
    registerProcess: function(req, res) {
        const errors = {}
        /* Validaciones */
        if(req.body.email == ""){
            errors.message = "El email es obligatorio";
            res.locals.errors = errors;
            return res.render('register')
        } else if(req.body.password == ""){
            errors.message = "La contraseña es obligatoria";
            res.locals.errors = errors;
            return res.render('register')
        } else if (req.body.password.length < 3) {
            errors.message = "La contraseña debe tener mas de 3 caracteres";
            res.locals.errors = errors;
            return res.render('register')
        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
            errors.message = "El archivo debe ser jpg o png";
            res.locals.errors = errors;
            return res.render('register')
        } else if(req.body.user == "") {
            errors.message = "El nombre de usuario es obligatorio"
            res.locals.errors = errors;
            return res.render('register')
        } else {
            users.findOne({
                where: [{email: req.body.email}]
            })
            .then(function(user){
                if(user != null){
                    errors.message = "El email ya esta registrado por favor elija otro";
                    res.locals.errors = errors;
                    return res.render('register')
                } else {
                    let usuario = {
                        user: req.body.user,
                        email: req.body.email,
                        password: hashSync(req.body.password, 10),
                        fecha_nacimiento: req.body.fecha_nacimiento,
                        image_profile: req.file.filename
                    }
                    users.create(usuario)
                        .then(() => {
                            return res.redirect('/')
                        })
                        .catch(e=>{
                            console.log(e)
                        })
                }
            }
            )
        }
    },
    login: function(req, res){
        return res.render("login")
    },
    loginStore: function(req, res){
        // Buscar el usuario que se quiere loguear.
        users.findOne({
            where: [{email: req.body.email}]
        })
        .then( user => {
            let errors = {};
            //¿Está el email en la base de datos
            if(user == null){
                //crear un mensaje de error
                errors.message = "El email no existe"
                //Pasar el mensaje a la vista
                res.locals.errors = errors
                //renderizar la vista
                return res.render('login');
            } else if(compareSync(req.body.password, user.password) == false){
                //crear un mensaje de error
                errors.message = "La contraseña es incorrecta"
                //Pasar el mensaje a la vista
                res.locals.errors = errors
                //renderizar la vista
                return res.render('login');
            } else {
                req.session.user = user;

                //Si tildó recordame => creamos la cookie.
                if(req.body.rememberme != undefined){
                    res.cookie('userId', user.id_user, { maxAge: 1000 * 60 * 5})
                }
                return res.redirect('/');
            }
        })
        .catch( e => {console.log(e)})
    },
    logout: function(req, res){
        req.session.destroy();

        res.clearCookie("userId");
        
        res.redirect("/")
    },
    profile: function(req, res) {
        const id = req.params.id

        users.findByPk(id, {
                include: [ 
                    {
                        association: 'comments',
                        include: {
                            association: 'users'
                        }
                    },
                    {
                        association: "products",
                        include: {
                            association: "comments"
                        }
                    },
                    { 
                        association: "leSiguen",
                        include: {
                            association: "seguidor"
                        }
                    },
                    { 
                        association: "sigue",
                        include: {
                            association: "seguido"
                        }
                    }
                ]
            })
            .then(data => {
                if (data == null) {
                    return res.redirect('/')
                } else {
                    return res.render('profile', { data: data})
                }
            })
            .catch(error => {
                console.log(error)
            })
    },
    profileEdit: function(req, res) {
        let id = req.params.id

        if (req.session.user) {
            if (id != req.session.user.id_user) {
                return res.redirect(`/users/profile-edit/${req.session.user.id_user}`)
            } else {
                users.findByPk(id, {
                        include: [
                            //relación comentario producto.
                            {
                                association: 'comments'
                            },
                            // relación producto usuario                                
                            {
                                association: 'products'
                            }
                        ]
                    })
                    .then(data => {
                        if (data == null) {
                            return res.redirect('/')
                        } else {
                            return res.render('profile-edit', { data: data })
                        }
                    }) 
                    .catch(error => {
                        console.log(error)
                    })
            } 
        } else {
            return res.redirect('/users/login')
        }
    },
    profileStore: function(req, res){
        const user = {
            user: req.body.user,
            email: req.body.email,
            password: hashSync(req.body.password, 10),
            fecha_nacimiento: req.body.fecha_nacimiento,
            image_profile: ""
        }

        if (req.file == undefined) {
            user.image_profile = req.session.user.image_profile;
        } else {
            user.image_profile = req.file.filename;
        }

        users.update(user, {
                where: {
                    id_user: req.session.user.id_user
                }
            })
            .then(function () {
                user.id_user = req.session.user.id_user
                req.session.user = user

                return res.redirect(`/users/profile/${user.id_user}`)
            })
            .catch(error => {
                console.log(error)
            }) 
    },
    seguir: function (req, res) {
      let idUsuarioAseguir = req.params.id; /* soy el id 5 y entro en el profile del id 4 -> me trae 4 */

      Seguidores.findAll({ 
            where: [{ id_seguido: idUsuarioAseguir }] //traer toda la gente que sigue al usuario 4
        })
        .then((resultado) => {
          let arr = [] //Almacenar las relaciones -> Dos opciones: [] / [true]
          //¿Esta la relacion creada?
          for (let i = 0; i < resultado.length; i++) { /* recorro los resultados de los que siguen al id 4 */
            if(resultado[i].id_seguidor == req.session.user.id_user) { //si el id de la persona logueada coincide con alguna persona que sigue al id 4 que pushee al array true
              arr.push(true) 
            } 
          }
          if (arr.length > 0) {
            //si lo encuentra significa que ya lo seguia por lo tanto lo esta dejando de seguir y eliminamos ambos ids
            Seguidores.destroy({
              where: {
                [Op.and]: [
                  { id_seguido: idUsuarioAseguir },
                  { id_seguidor: req.session.user.id_user },
                ],
              },
            });
          } else {
            //si no lo encuentra significa que no lo seguia por lo tanto lo tiene que empezar a seguir
            Seguidores.create({
              id_seguido: idUsuarioAseguir,
              id_seguidor: req.session.user.id_user,
            });
          }
          res.redirect("/users/profile/" + idUsuarioAseguir);
        })
        .catch((err) => {
          console.error(err);
        })
    },
    listaSeguidores: function(req, res) {
        const id = req.params.id

        users.findByPk(id, {
                include: [ 
                    { 
                        association: "leSiguen",
                        include: {
                            association: "seguidor"
                        }
                    }
                ]
            })
            .then(data => {
                if (data == null) {
                    return res.redirect('/')
                } else {
                    return res.render("listaSeguidores", {data: data})
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default userController;