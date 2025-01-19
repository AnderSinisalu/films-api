const { Sequelize, DataTypes } = require("sequelize");

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
        console.error("Connection failed: " + error);
    }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.films = require("./models/film")(sequelize, DataTypes);
db.users = require("./models/User")(sequelize, DataTypes);
db.userFilms = require("./models/UserFilm")(sequelize, DataTypes);

// Define relationships
db.users.belongsToMany(db.films, { through: db.userFilms, foreignKey: "UserID" });
db.films.belongsToMany(db.users, { through: db.userFilms, foreignKey: "FilmID" });

const sync = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Models have been synchronized successfully.");
    } catch (error) {
        console.error("Model synchronization failed: " + error);
    }
};

module.exports = { db, sync };
