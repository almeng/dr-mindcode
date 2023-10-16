// controleur composé de fonctions anonymes

//const express = require('express');
const wellcomme = (req, res)=>{
	const name = req.params.name; // donnée passée en get dans l'url
	console.log('/wellcomme/'+name)
	res.status(200).json({msg:"wellcomme Message", to:name});
}

const index = (req, res)=>{
	console.log('/welcome')
	res.status(200).json({msg:"Welcome to my BookNote"});
};

module.exports = { wellcomme, index };