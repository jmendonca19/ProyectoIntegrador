const db = require("../database/models");
const op = db.Sequelize.Op;
const products = db.Products

const productController = {
    index: function(req, res){
        const id = req.params.id;
        return res.render("products", {db: db});
    },
    add: function(req, res) {
        return res.render("products-add", {db: db});
    },
    searchResults: function(req, res) {
        return res.render("searchResults", {db: db})
    },
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
            products.create(producto)
            return res.redirect("/")
                
             }
    }} 
    

module.exports = productController;

