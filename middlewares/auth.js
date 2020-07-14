const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const tokenHeader = req.headers.token;

    if (!tokenHeader) {
        return res.send({ error: 'Autenticação recusada' });
    }

    jwt.verify(tokenHeader, process.env.APP_SECRET, (err, decoded) => {
        if (err) {
            return res.send({ error: 'Token inválido' });
        }

        res.locals.authData = decoded;
        return next();
    });
}

module.exports = auth;