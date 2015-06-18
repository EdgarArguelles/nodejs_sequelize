var messages = require(__base + "/utils/messages");

module.exports = function (sequelize, DataTypes) {
    var schema = {
        firstName: {type: DataTypes.STRING(10), field: "first_name", allowNull: false, comment: "Field comment!"},
        lastName: {type: DataTypes.STRING, field: "last_name"},
        phone: DataTypes.STRING,
        age: {
            type: DataTypes.INTEGER,
            validate: {max: {args: 23, msg: messages.ERROR_MAX(23)}, isInt: {msg: messages.ERROR_INTEGER}}
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    };

    var Personal = sequelize.define('personal', schema, {
        classMethods: {
            getTableName: function () {
                return 'personal'
            }
        },
        instanceMethods: {
            getFullName: function () {
                return [this.firstName, this.lastName].join(' ');
            }
        },
        timestamps: true,
        //tableName: 'custom_name',
        comment: "Table comment!"
    });

    //create many to many relationship
    Personal.belongsTo(sequelize.import(__base + "/models/user"), {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });

    return Personal;
};