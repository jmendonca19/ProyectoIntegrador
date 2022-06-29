module.exports = function (sequelize, dataTypes) {
    let alias = "Seguidor";

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        id_seguidor: {
            type: dataTypes.INTEGER,  // El sigue (seguidor).
        },
        id_seguido: {
            type: dataTypes.INTEGER, // A el lo siguen (seguidos). 
        }
    }

    let config = {
        tableName: 'seguidor_seguidos', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Seguidor = sequelize.define(alias, cols, config);

    Seguidor.associate = (models) => {
        Seguidor.belongsTo(models.Users, { /* el campo seguidores pertenece a muchos usuarios */
            as: 'seguidor',
            foreignKey: 'id_seguidor'
        }) ,
        Seguidor.belongsTo(models.Users, { /* el campo seguidos pertenece a muchos usuarios */
            as: 'seguido',
            foreignKey: 'id_seguido'
        })
    }

    return Seguidor;
}
