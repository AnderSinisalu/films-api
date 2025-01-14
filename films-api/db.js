const { Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_DATANAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOSTNAME,
        dialect: "mariadb",
        logging: console.log,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");        
    } catch (error) {
        console.error("Connection failed: " + error)
    }
})();

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.films = require("./models/film")(sequelize, DataTypes);
db.users = require("./models/User")(sequelize, DataTypes);

const sync = (async () => {
    await sequelize.sync({ force: true});
    console.log("models have been synchronised successfully")
});

module.exports = {db, sync};