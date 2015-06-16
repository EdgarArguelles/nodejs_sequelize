module.exports = function (server) {
    var path = __base + "/models/";
    server.db.import(path + "personal");
    server.db.import(path + "user");
    server.db.import(path + "role");
    server.db.import(path + "permission");

    server.db.sync({force: false});
};