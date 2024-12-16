const port = 8080;
const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');
var express = require('express');

const films = [
    {FilmID: 1, FilmTitle:"The Godfather", ReleaseYear: 1972, FilmLength: "2h55m"},
    {FilmID: 2, FilmTitle:"Interstellar", ReleaseYear: 2014, FilmLength: "2h49m"},
    {FilmID: 3, FilmTitle:"Fight Club", ReleaseYear: 1999, FileLength: "2h19m"},
    {FilmID: 4, FilmTitle:"Forrest Gump", ReleaseYear: 1994, FilmLength: "2h22m"}
]

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.json());

app.get('/films', (req, res) => {
    res.send(films)
})

app.get('/films/:id', (req, res) => {

    if(typeof films[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Film not found"})
    }
    if (req.params.id == null) {
        return res.status(400).send({error: "Invalid game ID"});
    }
    res.send(films[req.params.id - 1])
})

app.post('/films', (req, res)=> {
    if (!req.body.FilmTitle ||
        !req.body.ReleaseYear ||
        !req.body.FilmLength) 
    {
        return res.status(400).send({error: "One or multiple parameters are missing"});
    }

    let film = {
        FilmID: films.length + 1,
        FilmTitle: req.body.FilmTitle,
        ReleaseYear: req.body.ReleaseYear,
        FilmLength: req.body.FilmLength
    }
    films.push(film);
    res.status(201)
        .location(`${getBaseURL(req)}/films/${films.length}`)
        .send(film);
})

app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port}`);});

function getBaseURL(req) {
    return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
}