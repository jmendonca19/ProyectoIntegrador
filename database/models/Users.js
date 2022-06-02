module.exports = (sequelize, dataTypes)=>{
    let alias = "Users";
    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING
        },
        user: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        id_comment: {
            type: dataTypes.INTEGER
        },
        fecha_nacimiento: {
            type: dataTypes.DATE
        },
        dni: {
            type: dataTypes.INTEGER
        },
        image_profile: {
            type: dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }
   
    let config = {
       tableName: 'users',
       timestamps: true, //Aclaración en caso de no explicitar created_at, deleted_at y updated_at
       underscored: true, //Aclaración en caso que los timestamps usen guiones bajos en lugar de camelCase.
    }
   
    const Users = sequelize.define(alias, cols, config)

    Users.associate = function(models){
        Users.hasMany(models.Products, {
            as: "products",
            foreignKey: "id_user"
        })
    }
 
    return Users;
}
   