// routes/latihanGerakan.js

const router = require('express').Router();
const LatihanGerakanController = require("../controllers/latihanpergerakanController");
const checkAuth = require('../middlewares/auth');

router.post('/api/v1/gerakan', checkAuth, LatihanGerakanController.createLatihanGerakan);
router.get('/api/v1/gerakan', checkAuth, LatihanGerakanController.findAllLatihanGerakan);
router.put('/api/v1/gerakan/:id', checkAuth, LatihanGerakanController.updateLatihanGerakan);
router.delete('/api/v1/gerakan/:id', checkAuth, LatihanGerakanController.deleteLatihanGerakan);
router.get('/api/v1/gerakan/:id', checkAuth, LatihanGerakanController.findLatihanGerakanById);
router.get('/api/v1/gerakan-stress', checkAuth, LatihanGerakanController.findgerakanByUserIdStres);    

module.exports = router;


// /api/v1/latihangerakan
// LatihanGerakanController
// findAllLatihanGerakan
// findLatihanGerakanById
// createLatihanGerakan
// updateLatihanGerakan
// deleteLatihanGerakan