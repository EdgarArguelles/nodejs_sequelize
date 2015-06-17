var Error = require(__base + '/wrappers/error-msg'),
    Role = __sequelize.import(__base + "/models/role");

//privates section
var saveupdate = function (newrole) {
    return newrole.save()
        .then(function (role) {
            return role;
        })
        .catch(function (err) {
            if (err.errors) {
                return Error.fromErrors(err, Error.BAD_REQUEST);
            }
            return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
        });
};

module.exports = {
    //public section
    findAll: function () {
        return Role.findAll()
            .then(function (roles) {
                return roles;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    findById: function (id) {
        return Role.findById(id)
            .then(function (role) {
                if (!role) {
                    return Error.get("No data available", "", Error.NOT_FOUND);
                }
                return role;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    create: function (body) {
        return saveupdate(Role.build(body));
    },
    edit: function (id, body) {
        return this.findById(id).then(function (role) {
            if (Error.isError(role)) return role;

            role.description = body.description;
            return saveupdate(role);
        });
    }
};