module.exports = function (sequelize, DataTypes) {
    var schema = {
        name: {type: DataTypes.STRING(20), primaryKey: true},
        description: {type: DataTypes.STRING, allowNull: false}
    };

    var Role = sequelize.define('role', schema);

    //create many to many relationship
    Role.belongsToMany(sequelize.import(__base + "/models/permission"), {
        through: 'role_permission',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });

    return Role;
};