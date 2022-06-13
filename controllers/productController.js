const data = require("../db/data")
const db = require('../database/models')
const Usuario = db.Users
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
        return res.render("products-add", {data: data});
    },
    edit: function(req, res) {
        return res.render("product-edit", {data: data});
    },
    searchResults: function(req, res) {
        return res.render("searchResults", {data: data})
    }
}

module.exports = productController;