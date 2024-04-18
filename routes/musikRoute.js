const router = require('express').Router();
const musikController = require("../controllers/musikController");
const checkAuth = require('../middlewares/auth');

router.post('/api/v1/musik', checkAuth, musikController.create);
router.get('/api/v1/musik', checkAuth, musikController.findAll);
router.put('/api/v1/musik/:id', checkAuth, musikController.update);
router.delete('/api/v1/musik/:id', checkAuth, musikController.delete);
router.get('/api/v1/musik/:id', checkAuth, musikController.findOne);
router.get('/api/v1/musik-stress', checkAuth, musikController.findMusikByUserIdStres);    

module.exports = router;
