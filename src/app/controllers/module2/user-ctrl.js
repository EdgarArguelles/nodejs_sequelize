var Error = require(__base + '/wrappers/error-msg'),
    userSvc = require(__base + "/services/module2/user-svc");

module.exports = function (base, server) {
    server.get(base + '/', function (req, res) {
        userSvc.findAll().then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.get(base + '/:id', function (req, res) {
        userSvc.findById(req.params.id).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.post(base + '/new', function (req, res) {
        userSvc.create(req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.put(base + '/:id', function (req, res) {
        userSvc.edit(req.params.id, req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });
};