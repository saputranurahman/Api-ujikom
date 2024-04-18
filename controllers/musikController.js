    const db = require("../database/models");
    const Musik = db.Musik;
    const User = db.User;
    const TingkatStres = db.TingkatStres;
    const jwt = require("jsonwebtoken");

    const authMiddleware = require("../middlewares/auth");
const { Model } = require("sequelize");


    exports.findMusikByUserIdStres = async (req, res) => {
        try {
            // // Panggil middleware isLoggedIn sebelum mengeksekusi kode untuk menampilkan data musik
            // await isLoggedIn(req, res);
    
            // Dapatkan ID stres pengguna yang sedang login
            let token = req.headers.authorization;

            console.log(token);

            token = token.split(" ")[1];

            console.log(token);
            
            const decoded = jwt.verify(token, process.env.JWT_KEY_SECRET);

            const user = await User.findByPk(decoded.id);

            console.log(user.IdStress);
    
            // Cari semua data musik yang sesuai dengan ID stres pengguna
            const musikByStress = await Musik.findAll({
                where: {
                    id_stres: user.IdStress
                }
            });
    
            // Kirimkan data musik yang sesuai sebagai respons
            res.status(200).json({
                message: "Data musik berhasil diambil sesuai dengan ID stres pengguna.",
                data: musikByStress,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat mengambil data musik.",
                data: null,
            });
        }
    };
    



    exports.create = async (req, res) => {
        try {
            const { video, catatan, id_stres } = req.body;
    
            const missingFields = [];
            if (!video) {
                missingFields.push("Video");
            }
            if (!catatan) {
                missingFields.push("Catatan");
            }
            if (!id_stres) {
                missingFields.push("IDStres");
            }
    
            if (missingFields.length > 0) {
                return res.status(400).json({ message: `Field(s) ${missingFields.join(", ")} tidak boleh kosong` });
            }
    
            const newMusik = await Musik.create({ video, catatan, id_stres });
            res.status(201).json({
                message: "Data musik berhasil dibuat.",
                data: newMusik,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat membuat data musik.",
                data: null,
            });
        }
    };
    
    



    // Middleware auth
    exports.findAll = async (req, res) => {
        try {
            // Panggil middleware auth sebelum mengeksekusi kode untuk menampilkan data musik
            await authMiddleware(req, res, async () => {
                const musiks = await Musik.findAll({
                    include: [{
                        model: TingkatStres,
                        attributes: ['kategori']
                    }]
                });
    
                res.status(200).json({
                    message: "Data musik berhasil diambil.",
                    data: musiks,
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat mengambil data musik.",
                data: null,
            });
        }
    };
    

    // UPDATE Musik berdasarkan ID
    exports.update = async (req, res) => {
        try {
            const { id } = req.params;
            const { video, catatan, IDStres } = req.body;
            
            const musik = await Musik.findByPk(id);
            if (!musik) {
                return res.status(404).json({ message: "Data musik tidak ditemukan." });
            }

            await musik.update({ video, catatan, IDStres });
            res.status(200).json({ message: "Data musik berhasil diperbarui." });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat memperbarui data musik.",
                data: null,
            });
        }
    };

    // DELETE Musik berdasarkan ID
    exports.delete = async (req, res) => {
        try {
            const { id } = req.params;
            const musik = await Musik.findByPk(id);
            
            if (!musik) {
                return res.status(404).json({ message: "Data musik tidak ditemukan." });
            }

            await musik.destroy();
            res.status(200).json({ message: "Data musik berhasil dihapus." });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat menghapus data musik.",
                data: null,
            });
        }
    };

    // FIND Musik berdasarkan ID
    exports.findOne = async (req, res) => {
        try {
            const { id } = req.params;
            const musik = await Musik.findByPk(id);
            
            if (!musik) {
                return res.status(404).json({ message: "Data musik tidak ditemukan." });
            }

            res.status(200).json({
                message: "Data musik berhasil ditemukan.",
                data: musik,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat mencari data musik.",
                data: null,
            });
        }
    };
