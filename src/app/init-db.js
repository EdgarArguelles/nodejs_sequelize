module.exports = function () {
    var path = __base + "/models/";
    __sequelize.import(path + "personal");
    __sequelize.import(path + "user");
    __sequelize.import(path + "role");
    __sequelize.import(path + "permission");

    __sequelize.sync({force: false});
};