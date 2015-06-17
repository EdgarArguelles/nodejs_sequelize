module.exports = {
    ERROR_LEN: function (min, max) {
        return "should have between " + min + " and " + max + " chars";
    },
    ERROR_MAX: function (max) {
        return "should be " + max + " as maximum";
    },
    ERROR_MIN: function (min) {
        return "should be " + min + " as minimum";
    },
    ERROR_INTEGER: function () {
        return "must be an integer";
    }
};