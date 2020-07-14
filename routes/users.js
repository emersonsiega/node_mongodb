const express = require('express');
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.APP_SECRET, { expiresIn: '7d' });
}

router.get("/", async (req, res) => {
    try {
        const data = await Users.find({});

        return res.send(data);
    } catch (err) {
        res.status(500).send({ error: "Falhou ao consultar usuário " + err });
    }
});

router.post("/", async (req, res) => {
    if (!_isUserValid(req)) {
        return res.send({
            error: "Dados insuficientes!",
        });
    }

    try {
        const { email } = req.body;

        // Valida usuário já existente
        const data = await Users.findOne({ email });
        if (data) {
            return res.status(400).send({ error: "Usuário já cadastrado" });
        }

        // Cria e remove pwd para retornar..
        const userCreated = await Users.create(req.body);
        userCreated.password = undefined;
        return res.send({ userCreated, token: createUserToken(userCreated.id) });
    } catch (err) {
        return res.status(500).send({ error: "Falhou ao criar usuário " + err });
    }
});

router.post("/auth", async (req, res) => {
    if (!_isUserValid(req)) {
        return res.send({
            error: "Dados insuficientes!",
        });
    }

    try {
        const { email, password } = req.body;

        // Busca usuário no banco
        const data = await Users.findOne({ email }).select("+password");
        if (!data) {
            return res.status(401).send({ error: "Usuário não encontrado" });
        }

        // Decripta e valida password
        const same = await bcrypt.compare(password, data.password);
        if (!same) {
            return res.status(401).send({ error: "Senha inválida" });
        }

        data.password = undefined;
        return res.send({ data, token: createUserToken(data.id) });
    } catch (err) {
        return res.status(500).send({ error: "Falhou ao autenticar usuário " + err });
    }
});


function _isUserValid(req) {
    const { email, password } = req.body;

    return email && password;
}

module.exports = router;