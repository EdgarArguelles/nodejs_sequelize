var Error = require(__base + '/wrappers/error-msg'),
    personalSvc = require(__base + "/services/module2/personal-svc");

module.exports = function (base, server) {
    server.get(base + '/', function (req, res) {
        personalSvc.findAll().then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.get(base + '/:id', function (req, res) {
        personalSvc.findById(req.params.id).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.post(base + '/new', function (req, res) {
        personalSvc.create(req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });

    server.put(base + '/:id', function (req, res) {
        personalSvc.edit(req.params.id, req.body).then(function (result) {
            if (Error.isError(result)) return res.send(result.errorCode, result);
            res.send(result);
        });
    });
};