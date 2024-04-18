const db = require("../database/models");
const Saran = db.Saran;

exports.createSaran = async (req, res) => {
    try {
        const { saran, idstres } = req.body;
        if (!saran || !idstres) {
            return res.status(400).json({ message: "Saran dan ID stres tidak boleh kosong" });
        }
        const newSaran = await Saran.create({ saran, idstres });
        res.status(201).json({
            message: "Data saran berhasil dibuat.",
            data: newSaran,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat membuat data saran.",
            data: null,
        });
    }
};

exports.findAllSaran = async (req, res) => {
    try {
        const saran = await Saran.findAll({
            attributes: ['id', 'saran','idstres'] // Hanya ambil kolom yang diperlukan
        });
        res.status(200).json({
            message: "Semua data saran berhasil ditemukan.",
            data: saran,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data saran.",
            data: null,
        });
    }
};

exports.updateSaran = async (req, res) => {
    try {
        const { id } = req.params;
        const { saran, idstres } = req.body;
        const existingSaran = await Saran.findByPk(id);
        if (!existingSaran) {
            return res.status(404).json({ message: "Data saran tidak ditemukan." });
        }
        await existingSaran.update({ saran, idstres });
        res.status(200).json({ message: "Data saran berhasil diperbarui." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat memperbarui data saran.",
            data: null,
        });
    }
};


exports.deleteSaran = async (req, res) => {
    try {
        const { id } = req.params;
        const existingSaran = await Saran.findByPk(id);
        if (!existingSaran) {
            return res.status(404).json({ message: "Data saran tidak ditemukan." });
        }
        await existingSaran.destroy();
        res.status(200).json({ message: "Data saran berhasil dihapus." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat menghapus data saran.",
            data: null,
        });
    }
};

exports.findSaranById = async (req, res) => {
    try {
        const { id } = req.params;
        const existingSaran = await Saran.findByPk(id, {
            attributes: ['id', 'saran','idstres'] // Hanya ambil kolom yang diperlukan
        });
        if (!existingSaran) {
            return res.status(404).json({ message: "Data saran tidak ditemukan." });
        }
        res.status(200).json({
            message: "Data saran berhasil ditemukan.",
            data: existingSaran,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari data saran.",
            data: null,
        });
    }
};
