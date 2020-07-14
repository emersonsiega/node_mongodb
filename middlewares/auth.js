const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const tokenHeader = req.headers.token;

    if (!tokenHeader) {
        return res.status(401).send({ error: 'Autenticação recusada' });
    }

    jwt.verify(tokenHeader, process.env.APP_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido' });
        }

        res.locals.authData = decoded;
        return next();
    });
}

module.exports = auth;