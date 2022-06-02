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
        user_id: {
            type: dataTypes.INTEGER
        },
        id_comment: {
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
       timestamps: true, //Aclaración en caso de no explicitar created_at, deleted_at y updated_at
       underscored: true, //Aclaración en caso que los timestamps usen guiones bajos en lugar de camelCase.
    }
   
    const Products = sequelize.define(alias, cols, config)

    Products.associate = function(models){
        Products.belongsTo(models.Users, {
            as: "user",
            foreignKey: "id_user"
        })
    }
 
    return Products;
}
   