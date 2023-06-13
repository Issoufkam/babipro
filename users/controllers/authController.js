const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifier l'existence de l'utilisateur dans la base de données
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Nom d\'utilisateur ou mot de passe invalide.' });
    }

    // Vérifier la correspondance du mot de passe
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe invalide.' });
    }

    // Authentification réussie
    req.session.user = user; // Stocker les informations de l'utilisateur dans la session
    res.status(200).json({ message: 'Connexion réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy(); // Supprimer la session de l'utilisateur connecté
    res.status(200).json({ message: 'Déconnexion réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion.' });
  }
};
