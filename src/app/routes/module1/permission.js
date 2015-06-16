var Error = require(__base + '/wrappers/error-msg');

module.exports = function (base, server) {
    var Permission = server.db.import(__base + "/models/permission");

    server.get(base + '/', function (req, res) {
        Permission.findAll()
            .then(function (permissions) {
                res.send(permissions);
            })
            .catch(function (err) {
                res.send(Error.INTERNAL_SERVER_ERROR, Error.get("There was an error", err));
            });
    });

    server.get(base + '/:id', function (req, res) {
        Permission.findById(req.params.id)
            .then(function (permission) {
                if (!permission) {
                    return res.send(Error.NOT_FOUND, Error.get("No data available", ""));
                }
                res.send(permission);
            })
            .catch(function (err) {
                res.send(Error.INTERNAL_SERVER_ERROR, Error.get("There was an error", err));
            });
    });

    server.post(base + '/new', function (req, res) {
        var permission = Permission.build(req.body);
        permission.save()
            .then(function (p) {
                res.send(p);
            })
            .catch(function (err) {
                if (err.errors) {
                    return res.send(Error.BAD_REQUEST, Error.fromErrors(err));
                }
                res.send(Error.INTERNAL_SERVER_ERROR, Error.get("There was an error", err));
            });
    });

    server.put(base + '/:id', function (req, res) {
        Permission.findById(req.params.id)
            .then(function (permission) {
                if (!permission) {
                    return res.send(Error.NOT_FOUND, Error.get("No data available", ""));
                }

                permission.description = req.body.description;
                permission.save()
                    .then(function (p) {
                        res.send(p);
                    })
                    .catch(function (err) {
                        if (err.errors) {
                            return res.send(Error.BAD_REQUEST, Error.fromErrors(err));
                        }
                        res.send(Error.INTERNAL_SERVER_ERROR, Error.get("There was an error", err));
                    });
            })
            .catch(function (err) {
                res.send(Error.INTERNAL_SERVER_ERROR, Error.get("There was an error", err));
            });
    });
};