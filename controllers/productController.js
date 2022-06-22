const db = require('../database/models')
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
            order: [['comments', 'createdAt', 'DESC']]
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
    comment: function(req, res){
        if(req.session.user){
            const comentario = {
                id_user: req.session.user.id_user,
                id_product: req.params.id,
                comment: req.body.comment,
            }     
            Comentario.create(comentario)
            return res.redirect(`/products/product/${req.params.id}`)
        }else{
            return res.redirect("/users/login")
            }
    },
    destroyComment: function(req, res){
        Comentario.findByPk(req.params.id)
        .then(data => {
            Comentario.destroy({
                where: [
                    {
                        id_comment: req.params.id
                    }
                ]
            })
            .then(() =>{
                return res.redirect(`/products/product/${data.id_product}`)
            })
            .catch(error => {
                console.log(error)
            })
        })     
    },
    add: function(req, res) {
        return res.render("products-add", {db: db});
    },
    destroy: function(req, res) {
       const id = req.params.id

       Producto.findByPk(id)
       .then(data => {
           if(req.session.user.id_user == data.id_user){
            Comentario.destroy({
                where: [
                    {
                        id_product: id
                    }
                ]
            })
        .then(() => {
            Producto.destroy({
                where: [
                    {
                        id_product: id
                    }
                ]})
        
        })
        .then(() => {
            return res.redirect("/")
        })
        .catch(error => {
            console.log(error)
        })
        } else{
            return res.redirect("users/login")
        }

       })
       .catch(error => {
        console.log(error)
    })
 
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
    },
    productUpdate: function(req, res){
        const id = req.params.id;

        Producto.findByPk(id)
        .then(data => {
            const product = {
                name_product: req.body.name_product,
                image_product: "",
                description: req.body.description,
            }
            
            if(req.file == undefined){
                product.image_product = data.image_product;
            }else{
                product.image_product = req.file.filename;
            }
    
            Producto.update(product, {
                where: {
                    id_product: id
                }
            })
            .then(function(){
                return res.redirect(`/products/product/${id}`)
            })
            .catch(error =>{
                console.log(error)
            });
        })
    },
    searchResults: function(req, res) {

    const productSearch = req.query.search;
    const errors = {}

    if(productSearch == ""){
        errors.message = "Este campo no puede estar vacío";
        res.locals.errors = errors;
        return res.render('searchResults', {resultado:errors})
    } else {
            Producto.findAll({
                where: {
                    [Op.or]:[
                        {name_product: {[Op.like]: "%" + productSearch + "%", }},
                        {description: {[Op.like]: "%" + productSearch + "%", }},        
                    ]
                    },
                order: [
                    ['name_product', 'ASC']
                ],
                include: [  //relación comentario producto.
                { association: 'comments'},  //                         
                { association: 'users' } //relación comentario usuario 
            ],
            })
                .then(resultado => {
                    
                    if(resultado == ""){
                        errors.message = "No hay resultados para su búsqueda";
                        res.locals.errors = errors;
                        return res.render('searchResults', {resultado:errors})
                    } else{
                        return res.render('searchResults', {resultado: resultado})
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
        } else if (req.file == undefined){
            errors.message = "La foto del producto es obligatoria";
            res.locals.errors = errors;
            return res.render('products-add')
        }else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
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

