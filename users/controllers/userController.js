const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password, first_name, last_name, tel } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const user = new User({ username, password, first_name, last_name, tel });
    await user.save();

    // Enregistrer l'utilisateur et renvoyer la réponse
    res.status(201).json({ message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = req.session.user; // Récupérer les informations de l'utilisateur depuis la session

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non authentifié.' });
    }

    // Renvoyer les informations de l'utilisateur
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du profil utilisateur.' });
  }
};
