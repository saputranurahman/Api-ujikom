const express = require('express');
const auth = require('./authRoute');
const user = require('./userRoute');
const musik = require('./musikRoute');
const latihanpernafasan = require('./latihanpernafasanRoute');
const tingkatstres = require('./tingkatstresRoute');
const latihanpergerakan = require('./latihanpergerakanRoute');
const saran = require('./saranRoute');
// const kategori = require('./kategoriRoute');
// const tingkatstres = require('./tingkatstressRoute');
const router = express.Router();

router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message" : "Hello World"
    })
})

router.use(auth),
router.use(user),
router.use(musik),
router.use(latihanpernafasan),
router.use(tingkatstres),
router.use(latihanpergerakan),
router.use(saran),

module.exports = router;