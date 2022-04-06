const data = require("../db/data")

const mainController = {
    index: function(req, res){
        return res.render("index", {data: data});
    },
}

module.exports = mainController;