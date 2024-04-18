const router = require('express').Router();
const tingkatStresController = require('../controllers/tingkatstresController');
const checkAuth = require('../middlewares/auth');

router.post('/api/v1/tingkatstres', checkAuth, tingkatStresController.createTingkatStres);
router.get('/api/v1/tingkatstres', checkAuth, tingkatStresController.findAllTingkatStres);
router.put('/api/v1/tingkatstres/:id', checkAuth, tingkatStresController.updateTingkatStres);
router.delete('/api/v1/tingkatstres/:id', checkAuth, tingkatStresController.deleteTingkatStres);
router.get('/api/v1/tingkatstres/:id', checkAuth, tingkatStresController.findTingkatStresById);

module.exports = router;
