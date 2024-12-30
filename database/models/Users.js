export default (sequelize, dataTypes)=>{
    let alias = "Users";
    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        fecha_nacimiento: {
            type: dataTypes.DATE
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
       // tableName: 'users',
       timestamps: true, //Aclaración en caso de no explicitar created_at, deleted_at y updated_at
       underscored: true, //Aclaración en caso que los timestamps usen guiones bajos en lugar de camelCase.
    }
   
    const Users = sequelize.define(alias, cols, config)
    Users.associate = function(models){
        Users.hasMany(models.Products, {
            as: "products",
            foreignKey: "id_user"
        })
        Users.hasMany(models.Comments, {
            as: "comments",
            foreignKey: "id_user"
        })
        Users.hasMany(models.Seguidor, { /* un usuario sigue a muchos usuarios */
            as: 'sigue',
            foreignKey: 'id_seguidor'
        }),
        Users.hasMany(models.Seguidor, { /* un usuario tiene muchos seguidores */
            as: 'leSiguen',
            foreignKey: 'id_seguido'
        })
    }
 
    return Users;
}
   