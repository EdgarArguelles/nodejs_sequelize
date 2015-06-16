module.exports = function (base, server) {
    // module1
    require('./module1/permission')(base + '/permissions', server);
};