const data = require("../db/data")

const productController = {
    index: function(req, res){
        const id = req.params.id;
        return res.render("products", {data: data, id: id});
    },
    add: function(req, res) {
        return res.render("products-add", {data: data});
    },
    searchResults: function(req, res) {
        return res.render("searchResults", {data: data})
    }
}

module.exports = productController;