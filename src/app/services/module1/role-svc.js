var Error = require(__base + '/wrappers/error-msg'),
    Permission = __sequelize.import(__base + "/models/permission"),
    Role = __sequelize.import(__base + "/models/role");

//privates section
var saveupdate = function (newrole, permissions) {
    return __sequelize.transaction(function (t) {
        return newrole.save()
            .then(function (role) {
                if (permissions) {
                    role.setPermissions(permissions);
                    return role.save().then(function (full) {
                        return role;
                    });
                }
                return role;
            });
    }).then(function (role) {
        return role;
    }).catch(function (err) {
        if (err.errors) return Error.fromErrors(err, Error.BAD_REQUEST);
        return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
    });
};

module.exports = {
    //public section
    findAll: function () {
        return Role.findAll({include: [Permission]})
            .then(function (roles) {
                return roles;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    findById: function (id) {
        return Role.findById(id, {include: [Permission]})
            .then(function (role) {
                if (!role) return Error.get("No data available", "", Error.NOT_FOUND);
                return role;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    create: function (body) {
        return saveupdate(Role.build(body), body.permissions);
    },
    edit: function (id, body) {
        return this.findById(id).then(function (role) {
            if (Error.isError(role)) return role;

            role.description = body.description;
            return saveupdate(role, body.permissions);
        });
    }
};