module.exports = function (base, server) {
    // module1
    require('./module1/permission-ctrl')(base + '/permissions', server);
    require('./module1/role-ctrl')(base + '/roles', server);

    // module2
    require('./module2/user-ctrl')(base + '/users', server);
};