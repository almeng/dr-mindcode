const express = require('express');
const app = express();

const routeWellcomme = require('./route/welcome');

app.use(express.json()); // afficher facilement ls réponses en Json
app.use(express.urlencoded({extended:true})); //pour la lecture des données passées en Json

app.use('/api/vx',routeWellcomme);
/*

*/

app.listen(3000);
console.log('Your app is running');