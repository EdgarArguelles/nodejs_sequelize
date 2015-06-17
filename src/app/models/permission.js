var messages = require(__base + "/utils/messages");

module.exports = function (sequelize, DataTypes) {
    var schema = {
        name: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            validate: {len: {args: [1, 20], msg: messages.ERROR_LEN(1, 20)}}
        },
        description: {type: DataTypes.STRING, allowNull: false}
    };

    var Permission = sequelize.define('permission', schema);

    return Permission;
};