const repository = {
    configure() {
        const dotenv = require('dotenv');
        dotenv.config();

        const mongoose = require('mongoose');
        const url = process.env.MONGODB_CONNECTION;
        const options = {
            poolSize: 5,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        mongoose.connect(url, options);
        mongoose.set('useCreateIndex', true);

        mongoose.connection.on('error', (err) => {
            console.log(`Falhou ao conectar com o banco ${err}`);
        })

        mongoose.connection.on('connected', () => {
            console.log("Conectado ao banco de dados...");
        })
    }
};


module.exports = repository;