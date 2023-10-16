const express = require('express'); // import express 
//const { connect } = require('./bdd/connect');
const routesUtilisateur =  require('./route/utilisateur');

const app = express(); // creer une instance de server

app.use(express.urlencoded({extended: true})); // recupération des parametre des url (req.body, ...)
app.use(express.json()); // transformation des réponses en URL

app.use('/api/v1',routesUtilisateur);

try{
	/*
	connect('mongodb://127.0.0.1:27017/test',(erreur)=>{
		console.log('Connexion Pending');
		if(erreur){ // si erreur pendant la tentative de connexion
			console.log('Erreur lors de la connexion à la base de données');
			console.log('erreur mongodb, '+erreur);
			process.exit(-1);
		}else{
			console.log('Connexion Ended');
		}
	});
	*/
	app.listen(4000); // lancer le serveur sur le port 4000 lochalhost default
	console.log('Server running on port 4000');
	
}catch(error){
	console.log(error);
}



