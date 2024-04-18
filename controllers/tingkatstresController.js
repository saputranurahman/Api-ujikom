const db = require("../database/models");
const TingkatStres = db.TingkatStres;

// CREATE TingkatStres
exports.createTingkatStres = async (req, res) => {
    try {
        const { kategori } = req.body;

        if (!kategori) {
            return res.status(400).json({ message: "Kategori tidak boleh kosong" });
        }

        const newTingkatStres = await TingkatStres.create({ kategori });
        res.status(201).json({
            message: "Data tingkat stres berhasil dibuat.",
            data: newTingkatStres,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat membuat data tingkat stres.",
            data: null,
        });
    }
};

// READ All TingkatStres
exports.findAllTingkatStres = async (req, res) => {
    try {
        const tingkatStres = await TingkatStres.findAll({
            attributes: ['id', 'kategori', 'createdAt', 'updatedAt']
        });
        res.status(200).json({
            message: "Semua data tingkat stres berhasil ditemukan.",
            data: tingkatStres,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data tingkat stres.",
            data: null,
        });
    }
};

// UPDATE TingkatStres by ID
exports.updateTingkatStres = async (req, res) => {
    try {
        const { id } = req.params;
        const { kategori } = req.body;
        
        // Mencari data tingkat stres berdasarkan ID
        const tingkatStres = await TingkatStres.findByPk(id);
        
        // Jika data tidak ditemukan, kirim respons dengan status 404
        if (!tingkatStres) {
            return res.status(404).json({ message: "Data tingkat stres tidak ditemukan." });
        }

        // Memperbarui kategori tingkat stres
        await tingkatStres.update({ kategori });
        
        // Mengirim respons berhasil dengan status 200
        res.status(200).json({ message: "Data tingkat stres berhasil diperbarui." });
    } catch (error) {
        console.error(error);
        // Mengirim respons kesalahan dengan status 500
        res.status(500).json({
            message: "Terjadi kesalahan saat memperbarui data tingkat stres.",
            data: null,
        });
    }
};


// DELETE TingkatStres by ID
exports.deleteTingkatStres = async (req, res) => {
    try {
        const { id } = req.params;
        const tingkatStres = await TingkatStres.findByPk(id);
        
        if (!tingkatStres) {
            return res.status(404).json({ message: "Data tingkat stres tidak ditemukan." });
        }

        await tingkatStres.destroy();
        res.status(200).json({ message: "Data tingkat stres berhasil dihapus." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat menghapus data tingkat stres.",
            data: null,
        });
    }
};
// READ TingkatStres by ID
exports.findTingkatStresById = async (req, res) => {
    try {
        const { id } = req.params;
        const tingkatStres = await TingkatStres.findByPk(id, {
            attributes: ['id', 'kategori', 'createdAt', 'updatedAt'] // Memilih kolom yang sesuai dengan struktur tabel
        });
        
        if (!tingkatStres) {
            return res.status(404).json({ message: "Data tingkat stres tidak ditemukan." });
        }

        res.status(200).json({
            message: "Data tingkat stres berhasil ditemukan.",
            data: tingkatStres,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data tingkat stres.",
            data: null,
        });
    }
};

