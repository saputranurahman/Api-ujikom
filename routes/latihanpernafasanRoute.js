const router = require('express').Router();
const latihanPernafasanController = require("../controllers/latihanpernafasanController");
const checkAuth = require('../middlewares/auth');

router.post('/api/v1/pernafasan', checkAuth, latihanPernafasanController.createLatihanPernafasan);
router.get('/api/v1/pernafasan', checkAuth, latihanPernafasanController.findAllLatihanPernafasan);
router.put('/api/v1/pernafasan/:id', checkAuth, latihanPernafasanController.updateLatihanPernafasan);
router.delete('/api/v1/pernafasan/:id', checkAuth, latihanPernafasanController.deleteLatihanPernafasan);
router.get('/api/v1/pernafasan/:id', checkAuth, latihanPernafasanController.findLatihanPernafasanById);
router.get('/api/v1/pernafasan-stress', checkAuth, latihanPernafasanController.findpenafasanByUserIdStres);

module.exports = router;
