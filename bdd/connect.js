const { MongoClient, Db } = require("mongodb");// importation du module MongoDB

let client = null;

 function connect(uri, callback){
	if(client === null){ // verifier qu'un client bdd existe déjà
		//console.log('Client is null');
		//client = new MongoClient(url); //nouvelle instance de client Mongo
		client = new MongoClient(uri);
		//console.log(client);
		
		 client.connect((err)=>{
			if(err){
				client = null;
				console.log('Impossible de connecter le Client');
				callback(err);
			}else{
				console.log('Client connexion pending ');
				callback();
			}
		});
		//console.log(client);
	}else{
		console.log('Client not null');
		callback();
	}	
}

function db() {
	var db = new Db(client, "dbOK");
	return db;
}

function fermer(){
	if(client){ // si pas de connection open (non-nul)
		client.close();
		client = null;
		console.log('Client is disconnected');
	}
}

module.exports = { connect, client, db, fermer }; // Exposer les fonctions via export du module et ses fonctions