const db = require('../database/models')
const Products = db.Products;

const mainController = {
    index: function(req,res){
        Products.findAll({
            include: [
                {association: 'users'}, 
                {association:'comments'}
            ],
            order: [['createdAt', 'DESC']]
        })
            .then (data =>{
                return res.render('index', {products: data})
            }) 
            .catch (error =>{
                console.log(error)
            }) 
    },
}

module.exports = mainController;