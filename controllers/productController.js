const data = require("../db/data")

const productController = {
    index: function(req, res){
        return res.render("products", {data: data});
    },
    add: function(req, res) {
        return res.render("products-add");
    },
    searchResults: function(req,res) {
        return res.render("searchResults", {data: data})
    }
}

module.exports = productController;