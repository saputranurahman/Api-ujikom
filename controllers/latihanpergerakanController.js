const db = require("../database/models");
const LatihanGerakan = db.LatihanGerakan;
const User = db.User;
const jwt = require("jsonwebtoken");

//  const authMiddleware = require("../middlewares/auth");


    exports.findgerakanByUserIdStres = async (req, res) => {
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
            const gerakanByStress = await LatihanGerakan.findAll({
                where: {
                    id_stres: user.IdStress
                }
            });
    
            // Kirimkan data musik yang sesuai sebagai respons
            res.status(200).json({
                message: "Data musik berhasil diambil sesuai dengan ID stres pengguna.",
                data: gerakanByStress,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat mengambil data LatihanGerakan.",
                data: null,
            });
        }
    };


// CREATE LatihanGerakan
exports.createLatihanGerakan = async (req, res) => {
    try {
        const { video, catatan, id_stres } = req.body;

        if (!video || !catatan || !id_stres) {
            return res.status(400).json({ message: "Video, catatan, dan ID stres tidak boleh kosong" });
        }

        const newLatihanGerakan = await LatihanGerakan.create({ video, catatan, id_stres });
        res.status(201).json({
            message: "Data latihan gerakan berhasil dibuat.",
            data: newLatihanGerakan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat membuat data latihan gerakan.",
            data: null,
        });
    }
};

// READ All LatihanGerakan
exports.findAllLatihanGerakan = async (req, res) => {
    try {
        const latihanGerakans = await LatihanGerakan.findAll();
        res.status(200).json({
            message: "Semua data latihan gerakan berhasil ditemukan.",
            data: latihanGerakans,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data latihan gerakan.",
            data: null,
        });
    }
};

// UPDATE LatihanGerakan by ID
exports.updateLatihanGerakan = async (req, res) => {
    try {
        const { id } = req.params;
        const { video, catatan, id_stres } = req.body;
        
        const latihanGerakan = await LatihanGerakan.findByPk(id);
        if (!latihanGerakan) {
            return res.status(404).json({ message: "Data latihan gerakan tidak ditemukan." });
        }

        await latihanGerakan.update({ video, catatan, id_stres });
        res.status(200).json({ message: "Data latihan gerakan berhasil diperbarui." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat memperbarui data latihan gerakan.",
            data: null,
        });
    }
};

// DELETE LatihanGerakan by ID
exports.deleteLatihanGerakan = async (req, res) => {
    try {
        const { id } = req.params;
        const latihanGerakan = await LatihanGerakan.findByPk(id);
        
        if (!latihanGerakan) {
            return res.status(404).json({ message: "Data latihan gerakan tidak ditemukan." });
        }

        await latihanGerakan.destroy();
        res.status(200).json({ message: "Data latihan gerakan berhasil dihapus." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat menghapus data latihan gerakan.",
            data: null,
        });
    }
};

// READ LatihanGerakan by ID
exports.findLatihanGerakanById = async (req, res) => {
    try {
        const { id } = req.params;
        const latihanGerakan = await LatihanGerakan.findByPk(id);
        
        if (!latihanGerakan) {
            return res.status(404).json({ message: "Data latihan gerakan tidak ditemukan." });
        }

        res.status(200).json({
            message: "Data latihan gerakan berhasil ditemukan.",
            data: latihanGerakan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data latihan gerakan.",
            data: null,
        });
    }
};
