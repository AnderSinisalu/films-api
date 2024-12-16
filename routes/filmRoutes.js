const FilmsController = require('../controllers/FilmsController');

module.exports = (app) => {
    app.route("/films")
        .get(FilmsController.getAll)
        .post(FilmsController.create)
    app.route("/films/:id")
        .get(FilmsController.getById)
        .put(FilmsController.editById)
        .delete(FilmsController.deleteById)
}