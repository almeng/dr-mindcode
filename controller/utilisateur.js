const { ObjectId } = require("bson");
const { Utilisateur } = require('../model/utilisateur');
const { MongoClient} = require("mongodb");// importation du module MongoDB

//const client  = require('../bdd/connect');
const uri = 'mongodb://127.0.0.1:27017/';

const ajouterUtilisateur = async (req, res)=>{
	try{
		let utilisateur = new Utilisateur(req.body.nom, req.body.adresse, req.body.telephone); // creer un nouvelle instance de la classe User
		//console.log(client);
		const client = new MongoClient(uri); // initialisation de la connexion ici
		let result = await client
					.db('test')
					.collection('utilisateurs')
					.insertOne(utilisateur); // Ajouter un user en passant par le module User
		
		res.status(200).json(result); // publier retour de la fonction
		
	}catch(error){
		console.log('ajouterUtilisateur:');
		console.log(error);
		res.status(501).json(error);
	}
}

const getUtilisateurs = async (req, res)=>{
	try{
		const client = new MongoClient(uri); // connexion BDD
		let cursor = await client
					.db('test')
					.collection('utilisateurs')
					.find();
		let result = await cursor.toArray(); // mettre les résultats dans un tableau
		if(result.length > 0){
			res.status(200).json(result);	
		}else{
			res.status(204).json({msg:"Aucune donnée trouvée"});
		}
					
	}catch(err){
		console.log(err);
		res.status(500).json(err);
	}
}

const getUtilisateur = async (req, res)=>{
	try{
		let id = new ObjectId(req.params.id); //=> Number|String|... //let id = new ObjectID(req.params.id);
		//let id = ObjectId(32);
		console.log(id);
		const client = new MongoClient(uri);
		const cursor = await client
							.db('test')
							.collection('utilisateurs')
							.find({_id: id});
		let result = await cursor.toArray();
		if(result.length>0){
			console.log(result);
			res.status(200).json(result);	
		}else{
			res.status(204).json({msg:"Donnée recherchée introuvable"});
		}
		
	}catch(err){
		console.log(err);
		res.status(500).json(err);
	}
}

const modifierUtilisateur = async (req, res)=>{
	try{
		let id = new ObjectId(req.params.id); //=> Number|String|... //let id = new ObjectID(req.params.id);
		let dataSet = {
			nom: req.body.nom,
			adresse: req.body.adresse,
			telephone: req.body.telephone
		};
		//console.log(id);
		const client = new MongoClient(uri);
		const result = await client
							.db('test')
							.collection('utilisateurs')
							.updateOne({_id: id}, 
									  {$set: dataSet });
		if(result.modifiedCount == 1){ //compter le nombres de lignes modifiées
			const user = await client
							.db('test')
							.collection('utilisateurs')
							.findOne({_id: id});
			res.status(200).json({msg:"Modification reussie!", data: user.toArray()});
		}else{
			res.status(404).json({msg: "Cet utilisateur n'existe pas!"});
		}
		
	}catch(err){
		console.log(err);
		res.status(500).json(err);
	}
}

const supprimerUtilisateur = async (req, res)=>{
	try{
		let id = new ObjectId(req.params.id); //=> Number|String|... //let id = new ObjectID(req.params.id);
		const client = new MongoClient(uri);
		const result = await client
							.db('test')
							.collection('utilisateurs')
							.deleteOne({_id: id});
		if(result.deletedCount == 1){
			res.status(200).json({msg: "Suppression Reussie"});	
		}else{
			res.status(404).json({msg: "Cet utilisateur n'existe pas!"});	
		}
	}catch(err){
		console.log(err);
		res.status(500).json(err);
	}
}

module.exports = { ajouterUtilisateur, getUtilisateurs, getUtilisateur, modifierUtilisateur, supprimerUtilisateur };