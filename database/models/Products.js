module.exports = (sequelize, dataTypes)=>{
    let alias = "Products";
    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name_product: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING
        },
        image_product: {
            type: dataTypes.STRING
        },
        id_user: {
            type: dataTypes.INTEGER
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }
   
    let config = {
       tableName: 'products',
       timestamps: true, 
       underscored: true, 
    }
   
    const Products = sequelize.define(alias, cols, config)

    Products.associate = function(models){
        Products.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_user"
        })
        Products.hasMany(models.Comments,{
            as: 'comments',
            foreignKey: 'id_product' 
         }) 
    }
 
    return Products;
}
   