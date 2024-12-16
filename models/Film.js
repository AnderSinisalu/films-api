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
                type: DataTypes.STRING
            }
        }
    );

    console.log(Film === sequelize.models.Film);
    return Film;
}