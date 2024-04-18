const db = require("../database/models");
const LatihanPernafasan = db.LatihanPernafasan;

const User = db.User;
const jwt = require("jsonwebtoken");

//  const authMiddleware = require("../middlewares/auth");


    exports.findpenafasanByUserIdStres = async (req, res) => {
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
            const pernafasanByStress = await LatihanPernafasan.findAll({
                where: {
                    id_stres: user.IdStress
                }
            });
    
            // Kirimkan data musik yang sesuai sebagai respons
            res.status(200).json({
                message: "Data musik berhasil diambil sesuai dengan ID stres pengguna.",
                data: pernafasanByStress,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Terjadi kesalahan saat mengambil data LatihanGerakan.",
                data: null,
            });
        }
    };

// CREATE LatihanPernafasan
exports.createLatihanPernafasan = async (req, res) => {
    try {
        const { video, catatan, id_stres } = req.body;

        if (!video || !catatan || !id_stres) {
            return res.status(400).json({ message: "Video, catatan, dan ID stres tidak boleh kosong" });
        }

        const newLatihanPernafasan = await LatihanPernafasan.create({ video, catatan, id_stres });
        res.status(201).json({
            message: "Data latihan pernafasan berhasil dibuat.",
            data: newLatihanPernafasan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat membuat data latihan pernafasan.",
            data: null,
        });
    }
};

// READ All LatihanPernafasan
exports.findAllLatihanPernafasan = async (req, res) => {
    try {
        const latihanPernafasans = await LatihanPernafasan.findAll();
        res.status(200).json({
            message: "Semua data latihan pernafasan berhasil ditemukan.",
            data: latihanPernafasans,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data latihan pernafasan.",
            data: null,
        });
    }
};

// UPDATE LatihanPernafasan by ID
exports.updateLatihanPernafasan = async (req, res) => {
    try {
        const { id } = req.params;
        const { video, catatan, id_stres } = req.body;
        
        const latihanPernafasan = await LatihanPernafasan.findByPk(id);
        if (!latihanPernafasan) {
            return res.status(404).json({ message: "Data latihan pernafasan tidak ditemukan." });
        }

        await latihanPernafasan.update({ video, catatan, id_stres });
        res.status(200).json({ message: "Data latihan pernafasan berhasil diperbarui." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat memperbarui data latihan pernafasan.",
            data: null,
        });
    }
};

// DELETE LatihanPernafasan by ID
exports.deleteLatihanPernafasan = async (req, res) => {
    try {
        const { id } = req.params;
        const latihanPernafasan = await LatihanPernafasan.findByPk(id);
        
        if (!latihanPernafasan) {
            return res.status(404).json({ message: "Data latihan pernafasan tidak ditemukan." });
        }

        await latihanPernafasan.destroy();
        res.status(200).json({ message: "Data latihan pernafasan berhasil dihapus." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat menghapus data latihan pernafasan.",
            data: null,
        });
    }
};

// READ LatihanPernafasan by ID
exports.findLatihanPernafasanById = async (req, res) => {
    try {
        const { id } = req.params;
        const latihanPernafasan = await LatihanPernafasan.findByPk(id);
        
        if (!latihanPernafasan) {
            return res.status(404).json({ message: "Data latihan pernafasan tidak ditemukan." });
        }

        res.status(200).json({
            message: "Data latihan pernafasan berhasil ditemukan.",
            data: latihanPernafasan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data latihan pernafasan.",
            data: null,
        });
    }
};
