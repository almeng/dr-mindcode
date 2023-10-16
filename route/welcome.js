const express = require('express');
const router = express.Router();

const {wellcomme, index} = require('../controller/welcome'); // appeler fonction(s) en utilisant les accollades

router.route('/wellcomme/:name').get(wellcomme);
router.route('/').get(index);

module.exports = router ;