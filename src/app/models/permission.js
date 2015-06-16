module.exports = function (sequelize, DataTypes) {
    var schema = {
        name: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            validate: {len: {args: [1, 20], msg: "should be between 1 and 20 chars"}}
        },
        description: {type: DataTypes.STRING, allowNull: false}
    };

    var Permission = sequelize.define('permission', schema);

    return Permission;
};