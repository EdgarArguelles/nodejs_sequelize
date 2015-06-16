var restify = require('restify'),
    sequelize = require('sequelize');

/* ===================== Set Global Constant ======================= */
global.__base = __dirname;
global.__hash_algorithm = 'sha512';

/* ===================== Server ======================= */
var base_path = "/api";
var server = restify.createServer({
    name: 'nodejs_sequelize',
    version: '1.0.0'
});

//Enable Plugins
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});

/* ===================== DataBase ======================= */
server.db = new sequelize('mysql://root:root@localhost:3306/sequelize', {
    //logging: false,
    //global configurations for all the tables (could be overwrite by each table)
    define: {
        //engine: 'MYISAM', //default InnoDB
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        freezeTableName: true,
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    }
});

/* ===================== Init Data Base ======================= */
require('./init-db')(server);

/* ===================== Routes ======================= */
//require('./routes/index')(base_path, server);