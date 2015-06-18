var Error = require(__base + '/wrappers/error-msg'),
    Role = __sequelize.import(__base + "/models/role"),
    User = __sequelize.import(__base + "/models/user");

//privates section
var saveupdate = function (newuser, roles) {
    return __sequelize.transaction(function (t) {
        return newuser.save()
            .then(function (user) {
                if (roles) {
                    user.setRoles(roles);
                    return user.save().then(function (full) {
                        return user;
                    });
                }
                return user;
            });
    }).then(function (user) {
        return user;
    }).catch(function (err) {
        if (err.errors) return Error.fromErrors(err, Error.BAD_REQUEST);
        return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
    });
};

module.exports = {
    //public section
    findAll: function () {
        return User.findAll({include: [Role]})
            .then(function (users) {
                return users;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    findById: function (id) {
        return User.findById(id, {include: [Role]})
            .then(function (user) {
                if (!user) return Error.get("No data available", "", Error.NOT_FOUND);
                return user;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    create: function (body) {
        var user = User.build(body);
        user.password = body.password ? User.hashPassword(body.password) : undefined;
        return saveupdate(user, body.roles);
    },
    edit: function (id, body) {
        return this.findById(id).then(function (user) {
            if (Error.isError(user)) return user;

            user.name = body.name;
            user.password = body.password ? User.hashPassword(body.password) : undefined;
            return saveupdate(user, body.roles);
        });
    }
};