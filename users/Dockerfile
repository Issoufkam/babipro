# Utilise une image de base contenant Node.js
FROM node:14

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers du projet dans le conteneur
COPY . .

# Expose le port sur lequel l'application Express.js écoute
EXPOSE 3000

# Démarre l'application lorsque le conteneur est lancé
CMD ["npm", "start"]
