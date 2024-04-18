    const jwt = require("jsonwebtoken");
    const model = require("../database/models");
    require("dotenv").config();

    module.exports = async (req, res, next) => {
        try {
            let token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({
                    message: "Silakan masukkan token dalam header Authorization"
                });
            }

            token = token.split(" ")[1];
            
            const decoded = jwt.verify(token, process.env.JWT_KEY_SECRET);
            const user = await model.User.findByPk(decoded.id);

            if (!user) {
                return res.status(401).json({
                    message: "Pengguna tidak ditemukan dalam database"
                });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                message: "Token tidak valid atau kadaluarsa"
            });
        }
    };
