const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
const port = 3000;

// Middleware pour parser les données du corps de la requête
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connexion à la base de données réussie');
}).catch((error) => {
  console.error('Erreur de connexion à la base de données', error);
});

// ...

// Routes et fonctionnalités supplémentaires

// ...

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
