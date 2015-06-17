module.exports = function (base, server) {
    // module1
    require('./module1/permission-ctrl')(base + '/permissions', server);
};