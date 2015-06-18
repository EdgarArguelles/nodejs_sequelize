var Error = require(__base + '/wrappers/error-msg'),
    Personal = __sequelize.import(__base + "/models/personal");

//privates section
var saveupdate = function (newpersonal) {
    return __sequelize.transaction(function (t) {
        return newpersonal.save()
            .then(function (personal) {
                return personal;
            });
    }).then(function (personal) {
        return personal;
    }).catch(function (err) {
        if (err.errors) return Error.fromErrors(err, Error.BAD_REQUEST);
        return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
    });
};

module.exports = {
    //public section
    findAll: function () {
        return Personal.findAll({include: [{all: true}]})
            .then(function (personals) {
                return personals;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    findById: function (id) {
        return Personal.findById(id, {include: [{all: true, nested: true}]})
            .then(function (personal) {
                if (!personal) return Error.get("No data available", "", Error.NOT_FOUND);
                console.log(Personal.getTableName());
                console.log(personal.getFullName());
                return personal;
            })
            .catch(function (err) {
                return Error.get("There was an error", err, Error.INTERNAL_SERVER_ERROR);
            });
    },
    create: function (body) {
        var personal = Personal.build(body);
        return saveupdate(personal);
    },
    edit: function (id, body) {
        return this.findById(id).then(function (personal) {
            if (Error.isError(personal)) return personal;

            personal.firstName = body.firstName;
            personal.lastName = body.lastName;
            personal.phone = body.phone;
            personal.age = body.age;
            personal.user_id = body.user_id;
            return saveupdate(personal);
        });
    }
};