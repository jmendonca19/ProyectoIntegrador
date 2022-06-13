module.exports = (sequelize, dataTypes)=>{
    let alias = "Comments";
    let cols = {
        id_comment: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        comment: {
            type: dataTypes.STRING
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        id_user: {
            type: dataTypes.INTEGER
        },
    }
   
    let config = {
       tableName: 'comments',
       timestamps: false, //Aclareción en caso de no explicitar created_at, deleted_at y updated_at
    }
   
    const Comments = sequelize.define(alias, cols, config)
 
    return Comments;
}
   