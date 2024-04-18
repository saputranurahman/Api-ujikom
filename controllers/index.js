const authController = require('./authController');
const userController = require('./userController');
const musikController = require('./musikController');
const latihanpernafasanController = require('./latihanpernafasanController');
const latihanpergerakanController = require('./latihanpergerakanController');
const tingkatstresController = require('./tingkatstresController');
const saranController = require('./saranController');
module.exports = {
    auth : authController,
    user : userController,
    musik: musikController,
    latihanpernafasan : latihanpernafasanController,
    tingkatstres : tingkatstresController,
    latihanpergerakan : latihanpergerakanController,
    saran : saranController
};