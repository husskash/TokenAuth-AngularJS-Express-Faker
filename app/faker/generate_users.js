module.exports = function() {
    var faker = require("faker");
    var _ = require("lodash");

    return {
        users: _.times(100, function (n) {
            return {
                id: n+1,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                userName: faker.internet.userName(),
                password: faker.internet.password()
            };
        })
    };
};
