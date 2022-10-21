import { Sequelize } from "sequelize";
 
const db = new Sequelize('auth_ch6', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});

export default db;