var wrapper = {
    message: "",
    messages: [],
    devMessage: ""
};

module.exports = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    get: function (message, devMessage) {
        wrapper.message = message;
        wrapper.messages = [message];
        wrapper.devMessage = devMessage;
        return wrapper;
    },
    fromErrors: function (err) {
        wrapper.message = null;
        wrapper.messages = [];
        wrapper.devMessage = err;
        for (var attributename in err.errors) {
            var error = err.errors[attributename],
                msg = null,
                field = error.path;
            switch (error.type) {
                case "notNull Violation" :
                    msg = "The field [" + field + "] is required.";
                    break;
                case "unique violation" :
                    msg = "There is another entry with the same value that field [" + field + "].";
                    break;
                case "Validation error" :
                    msg = "The field [" + field + "] " + error.message + ".";
                    break;
                default :
                    msg = error.message;
            }

            wrapper.messages.push(msg);
            if (!wrapper.message) {
                wrapper.message = msg;
            }
        }
        return wrapper;
    }
};