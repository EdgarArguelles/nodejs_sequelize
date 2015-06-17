var Error = require(__base + '/wrappers/error-msg'),
    permissionSvc = require(__base + "/services/module1/permission-svc");

module.exports = function (base, server) {
    server.get(base + '/', function (req, res) {
        permissionSvc.findAll().then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.get(base + '/:id', function (req, res) {
        permissionSvc.findById(req.params.id).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.post(base + '/new', function (req, res) {
        permissionSvc.create(req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.put(base + '/:id', function (req, res) {
        permissionSvc.edit(req.params.id, req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });
};