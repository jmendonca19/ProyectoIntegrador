const data = require("../db/data")

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
    }
}

module.exports = userController;