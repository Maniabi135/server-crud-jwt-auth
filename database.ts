import { Sequelize } from 'sequelize-typescript';
import { dbconfig } from './config';
import { User } from "./models/user-model";

export const sequelize =  new Sequelize({
    database: dbconfig.database,
    dialect : dbconfig.dialect,
    username: dbconfig.username,
    password: dbconfig.password,
    host    : dbconfig.host,
    port    : dbconfig.port
});

sequelize.addModels([User]);

sequelize.authenticate().then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
});

initializeDatabase();

// Force Initialization of the models and wipe all data ///
function initializeDatabase() {
    sequelize.sync({ force: false }).then(() => {
        console.log('Connection synced');
        return;
    }).catch(err => {
        console.log('err');
    });
}