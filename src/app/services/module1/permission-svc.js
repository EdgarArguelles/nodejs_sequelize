var Error = require(__base + '/wrappers/error-msg'),
    Permission = __sequelize.import(__base + "/models/permission");

//privates section
var saveupdate = function (newpermission) {
    return newpermission.save()
        .then(function (permission) {
            return permission;
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
        return Permission.findAll()
            .then(function (permissions) {
                return permissions;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    findById: function (id) {
        return Permission.findById(id)
            .then(function (permission) {
                if (!permission) {
                    return Error.get("No data available", "", Error.NOT_FOUND);
                }
                return permission;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    create: function (body) {
        return saveupdate(Permission.build(body));
    },
    edit: function (id, body) {
        return this.findById(id).then(function (permission) {
            if (Error.isError(permission)) return permission;

            permission.description = body.description;
            return saveupdate(permission);
        });
    }
};