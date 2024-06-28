const express = require('express');
const router = express.Router();
const RegistreController = require('../controllers/RegistreController');

router.get('/', RegistreController.getAllRegistres);
router.post('/', RegistreController.createRegistre);
router.get('/:id', RegistreController.getRegistreById);
router.put('/:id', RegistreController.updateRegistre);
router.delete('/:id', RegistreController.deleteRegistre);

module.exports = router;
