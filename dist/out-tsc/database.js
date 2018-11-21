"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./config");
const user_model_1 = require("./models/user-model");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: config_1.dbconfig.database,
    dialect: config_1.dbconfig.dialect,
    username: config_1.dbconfig.username,
    password: config_1.dbconfig.password,
    host: config_1.dbconfig.host,
    port: config_1.dbconfig.port
});
exports.sequelize.addModels([user_model_1.User]);
exports.sequelize.authenticate().then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
});
initializeDatabase();
// Force Initialization of the models and wipe all data ///
function initializeDatabase() {
    exports.sequelize.sync({ force: false }).then(() => {
        console.log('Connection synced');
        return;
    }).catch(err => {
        console.log('err');
    });
}
//# sourceMappingURL=database.js.map