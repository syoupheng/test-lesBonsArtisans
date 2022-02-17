# Installation du serveur

Pour lancer le serveur, vous aurez besoin d'installer mongoDB ainsi que NodeJS et express. Vous pouvez installer toutes les dépendences en vous plaçant dans le dossier server puis avec la commande : `npm install`

Pour importer les données issues du fichier Products.json placez vous à la racine du projet et entrez : 

`mongoimport --jsonArray --db lesBonsArtisans --collection products --file Products.json`

Je précise que j'ai supprimé le champ _id dans les données d'origine afin d'utiliser à la place l'id généré par mongoDB.

Pour la connexion entre le serveur et la base de données, vous pouvez entrer les informations de votre bdd dans le fichier database.js.

Enfin, vous pouvez lancer le serveur avec la commande : `nodemon`

# Installation du client

De même que pour le serveur, vous pouvez installer les dépendances en vous plaçant dans le dossier clienr puis avec la commande : `npm install``

Enfin, vous pouvez lancer le client avec la commande : `npm start`
