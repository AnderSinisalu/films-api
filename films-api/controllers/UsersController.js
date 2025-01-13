const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const users = await db.users.findAll();
    console.log(users)
    res
    .status(200)
    .send(users.map(({ID, Username, Lastname, Email, SecureLevel, LevelKey}) => {return {ID, Username, Lastname, Email, SecureLevel, LevelKey}}))
}

exports.getById = async (req, res) => {
    const user = await getUser(req, res);
    if (!user) { return };
    return res.send(user);
}

exports.create = async (req, res) => {
    if (!req.body.Username ||
        !req.body.Firstname ||
        !req.body.Lastname ||
        !req.body.Email) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }

    const newUser = {
        Username: req.body.Username,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Email: req.body.Email,
        SecureLevel: req.body.SecureLevel || 0,
        LevelKey: req.body.LevelKey || "0-0",
    };

    try {
        const createdUser = await db.users.create(newUser);

        res.status(201)
            .location(`${Utils.getBaseURL(req)}/users/${createdUser.ID}`)
            .send({ ID: createdUser.ID });
    } catch (error) {
        console.error(error);

        res.status(500).send({ error: "Error creating user" });
    }
};


exports.editById = async (req, res) => {
    const user = await getUser(req, res); // Use the getUser function

    if (!user) {
        return; // If getUser returned null, an error response has already been sent
    }

    // Validate required fields in the request body
    if (!req.body.Username ||
        !req.body.Firstname ||
        !req.body.Lastname ||
        !req.body.Email ||
        !req.body.SecureLevel ||
        !req.body.LevelKey) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }

    try {
        // Update the user's fields
        user.Username = req.body.Username;
        user.Firstname = req.body.Firstname;
        user.Lastname = req.body.Lastname;
        user.Email = req.body.Email;
        user.SecureLevel = req.body.SecureLevel;
        user.LevelKey = req.body.LevelKey;

        // Save the changes
        await user.save();

        // Send the updated user as the response
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error updating user" });
    }
};


exports.deleteById = async (req,res) => {
    const user = await getUser(req, res);
    if (!user) { return };
    await user.destroy();
    res.status(204).send({error: "No Content"});
}

const getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID
        const user = await db.users.findByPk(userId);

        if (!user) {
            res.status(404).send({ error: `User with ID ${userId} not found` });
            return null;
        }

        return user;
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error retrieving user" });
        return null;
    }
};