const express = require('express');
const { ajouterUtilisateur, getUtilisateurs, getUtilisateur, modifierUtilisateur, supprimerUtilisateur } = require('../controller/utilisateur'); 

const router = express.Router();

router.route('/utilisateurs').post(ajouterUtilisateur);
router.route('/utilisateurs').get(getUtilisateurs);
router.route('/utilisateurs/:id').get(getUtilisateur);
router.route('/utilisateurs/:id').put(modifierUtilisateur); // update user via Id
router.route('/utilisateurs/:id').delete(supprimerUtilisateur); // delete user via Id

module.exports = router; //exporter le router utilisateur