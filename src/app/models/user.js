var messages = require(__base + "/utils/messages"),
    crypto = require('crypto');

module.exports = function (sequelize, DataTypes) {
    var schema = {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {len: {args: [5, 20], msg: messages.ERROR_LEN(5, 20)}}
        },
        password: {type: DataTypes.STRING, allowNull: false}
    };

    var User = sequelize.define('user', schema, {
        classMethods: {
            hashPassword: function (password) {
                return crypto.createHash(__hash_algorithm).update(password).digest('hex');
            }
        }
    });

    //create many to many relationship
    User.belongsToMany(sequelize.import(__base + "/models/role"), {
        through: 'user_role',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });

    return User;
};