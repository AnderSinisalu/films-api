module.exports = (sequelize, DataTypes) => {
    const Film = sequelize.define(
        'Film',
        {
            FilmID:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            FilmTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ReleaseYear: {
                type: DataTypes.INTEGER
            },
            FilmLength: {
                type: DataTypes.INTEGER
            }
        }
    );

    Film.associate = (models) => {
        Film.belongsToMany(models.User, {
            through: models.UserFilm,
            foreignKey: 'FilmID',
            otherKey: 'UserID',
        });
    };    

    console.log(Film === sequelize.models.Film);
    return Film;
}