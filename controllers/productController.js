const data = require("../db/data")

const productController = {
    index: function(req, res){
        return res.render("products", {data: data});
    },
    add: function(req, res) {
        return res.render("products-add");
    }
}

module.exports = productController;