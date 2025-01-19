const {db} = require("../db");
const Utils = require("./utils");

exports.assignFilm = async (req, res) => {
  const { userId, filmId } = req.body;

  if (!userId || !filmId) {
    return res.status(400).send({ error: 'User ID and Film ID are required.' });
  }

  try {
    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    // Check if the film exists
    const film = await db.Film.findByPk(filmId);
    if (!film) {
      return res.status(404).send({ error: 'Film not found.' });
    }

    // Assign film to user
    await db.UserFilm.create({ UserId: userId, FilmId: filmId });
    res.status(201).send({ message: 'Film assigned to user successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while assigning the film.' });
  }
};
