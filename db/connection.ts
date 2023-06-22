import { Sequelize } from "sequelize";

const db = new Sequelize('apprutas', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;