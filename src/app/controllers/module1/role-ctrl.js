var Error = require(__base + '/wrappers/error-msg'),
    roleSvc = require(__base + "/services/module1/role-svc");

module.exports = function (base, server) {
    server.get(base + '/', function (req, res) {
        roleSvc.findAll().then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.get(base + '/:id', function (req, res) {
        roleSvc.findById(req.params.id).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.post(base + '/new', function (req, res) {
        roleSvc.create(req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.put(base + '/:id', function (req, res) {
        roleSvc.edit(req.params.id, req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });
};