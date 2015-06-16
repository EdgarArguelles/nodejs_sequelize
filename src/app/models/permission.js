module.exports = function (sequelize, DataTypes) {
    var schema = {
        name: {type: DataTypes.STRING(20), primaryKey: true},
        description: {type: DataTypes.STRING, allowNull: false}
    };

    var Permission = sequelize.define('permission', schema);

    return Permission;
};