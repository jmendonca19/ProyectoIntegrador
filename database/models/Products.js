module.exports = (sequelize, dataTypes)=>{
    let alias = "Products";
    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
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
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
    }
   
    let config = {
       tableName: 'products',
       timestamps: true,
    }
   
    const Products = sequelize.define(alias, cols, config)
    return Products;
}
   