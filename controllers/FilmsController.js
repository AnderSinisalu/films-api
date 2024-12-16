const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => { 
    const films = await db.films.findAll();
    console.log(films)
    res
    .send(films
        .map(({FilmID, FilmTitle}) => {return {FilmID, FilmTitle}}))
}

exports.getById = async (req, res) => {
    const film = await getFilm(req, res);
    if (!film) { return};
    return res.send(film);
    }

exports.create = async (req, res) => {
    if (!req.body.FilmTitle || 
        !req.body.ReleaseYear ||
        !req.body.FilmLength) 
    {   return res.status(400).send({error: "One or multiple parameters are missing"});    }

    let newFilm = {        
        FilmTitle: req.body.FilmTitle,
        ReleaseYear: req.body.ReleaseYear,
        FilmLength: req.body.FilmLength
    }
    const createdFilm = await db.films.create(newFilm);
    res.status(201)
        .location(`${Utils.getBaseURL(req)}/films/${createdFilm.FilmID}`)
        .send(createdFilm.FilmID);
}

exports.editById = async (req,res) => {
    const film = await getFilm(req, res);
    if (!film) { return };
    if (!req.body.FilmTitle || 
        !req.body.ReleaseYear ||
        !req.body.FilmLength) 
    {   return res.status(400).send({error: "One or multiple parameters are missing"});    }
    film.FilmTitle = req.body.FilmTitle
    film.ReleaseYear = req.body.ReleaseYear
    film.FilmLength = req.body.FilmLength
    await film.save();
    return res.status(201)
        .location(`${Utils.getBaseURL(req)}/films/${film.FilmID}`)
        .send(film);
}

exports.deleteById = async (req, res) => {
    const film = await getFilm(req,res);
    if (!film) { return };
    await film.destroy();
    res.status(204).send({error: "No Content"});
    
}

const getFilm = async (req, res) => {
    const idNumber = parseInt(req.params.FilmID);
    if (isNaN(idNumber)) {
        res.status(400).send({error: `Invalid film ID ${req.params.FilmID}`});
        return null;
    }
    const film = await db.films.findByPk(idNumber);
    if (!film) {
        res.status(404).send({error: "Film not found"});
        return null;
    }
    return film;
}