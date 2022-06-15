
const db = require('../database/models');
const Usuario = db.Users;
const Producto = db.Products;
const Comentario = db.Comments;
const Op = db.Sequelize.Op;

const productController = {
    detail: function(req, res){
        const id = req.params.id;
        
        Producto.findByPk(id, {
            include: [  //relación comentario producto.
                { association: 'comments',
                    include: { association: 'users' },
                },                           
                { association: 'users' }
            ],
        })
            .then(data => {
                //Si no hay producto que coincida con el id, redirecciona a home.
                if (data == null) {
                    return res.redirect('/')
                } else {
                    return res.render('products', { data: data })
                }
            })
            .catch(error => {
                console.log(error)
            })
    },
    add: function(req, res) {
        return res.render("products-add", {db: db});
    },
    edit: function(req, res) {
        const id = req.params.id;
        if(req.session.user){
            Producto.findByPk(id)
                .then(data=>{
                    if(req.session.user.id_user == data.id_user){
                        return res.render("product-edit", {data: data}); 
                    }else{
                        return res.redirect("/")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }else{
            return res.redirect("/users/login")
        }
        return res.render("product-edit", {data: data});
    },
    productUpdate: function(req, res){
        const product = {
            name_product: req.body.name_product,
            image_product: "",
            description: req.body.description,
        }
        if(req.file == undefined){
            product.image_product = req.session.user.image_profile;
        }else{
            product.image_product = req.file.filename;
        }

        
    },
    searchResults: function(req, res) {
        const productSearch = req.params.search;
        const errors = {}
        if(productSearch == ""){
        errors.message = "Este campo no puede estar vacío";
        res.locals.errors = errors;
        return res.render('searchResults')
    } else {
            Producto.findAll({
                where: [{name_product: {[Op.like]: "%" + productSearch + "%"} }],
                order: [
                    ['name_product', 'ASC']
                ]
            })
                .then(resultado => {
                    //Si no hay producto que coincida con el id, redirecciona a home.
                    if (productSearch == null) {
                        return res.redirect('/')
                    } else {
                        return res.render('searchResults', { resultado: resultado })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }}, 
    
    productStore: function(req, res){
        const errors = {}
        if(req.body.name_product == ""){
            errors.message = "El nombre del producto es obligatorio",
            res.locals.errors = errors;
            return res.render('products-add')
        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
            errors.message = "El archivo debe ser jpg o png";
            res.locals.errors = errors;
            return res.render('products-add')
        } else if (req.body.description == ""){
            errors.message = "La descripción del producto es obligatoria";
            res.locals.errors = errors;
            return res.render('products-add')
        } else {
            let producto = {
                name_product: req.body.name_product,
                description: req.body.description,
                image_product: req.file.filename,
                id_user: req.session.user.id_user,
            }
            Producto.create(producto)
            return res.redirect("/")
                
             }
    }} 
    

module.exports = productController;

