module.exports = (sequelize, DataTypes) => {
    const UserFilm = sequelize.define('UserFilm', {
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FilmID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    UserFilm.associate = (models) => {
        UserFilm.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
        UserFilm.belongsTo(models.Film, { foreignKey: 'FilmID', onDelete: 'CASCADE' });
    };

    return UserFilm;
};
