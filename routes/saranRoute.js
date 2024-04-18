const router = require('express').Router();
const saranController = require("../controllers/saranController");
const checkAuth = require('../middlewares/auth');

router.post('/api/v1/saran', checkAuth, saranController.createSaran);
router.get('/api/v1/saran', checkAuth, saranController.findAllSaran);
router.put('/api/v1/saran/:id', checkAuth, saranController.updateSaran);
router.delete('/api/v1/saran/:id', checkAuth, saranController.deleteSaran);
router.get('/api/v1/saran/:id', checkAuth, saranController.findSaranById);

module.exports = router;
