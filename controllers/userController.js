const db = require("../database/models");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).send({
                message: "Name, email, and password cannot be empty",
            });
        }

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            role: req.body.role || false,
            id_stress: null, // Atur nilai null jika tidak ada id_stress yang tersedia
        };

        const newUser = await User.create(user);

        res.status(201).json({
            message: "User created successfully.",
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while creating the user.",
            data: null,
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json({
            message: "User retrieved successfully.",
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while retrieving users.",
            data: null,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password);
        }

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || false,
            id_stress: req.body.id_stress,
        };

        const [num] = await User.update(userData, {
            where: { id },
        });

        if (num === 1) {
            res.json({
                message: "User updated successfully.",
                data: userData,
            });
        } else {
            res.json({
                message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
                data: userData,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while updating the user.",
            data: null,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const num = await User.destroy({
            where: { id },
        });

        if (num === 1) {
            res.json({
                message: "User deleted successfully.",
                data: req.body,
            });
        } else {
            res.json({
                message: `Cannot delete user with id=${id}. Maybe user was not found!`,
                data: req.body,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while deleting the user.",
            data: null,
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (user) {
            res.json({
                message: "User retrieved successfully.",
                data: user,
            });
        } else {
            res.status(404).json({
                message: "User not found.",
                data: null,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while retrieving user.",
            data: null,
        });
    }
};

exports.me = async (req, res) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: "Token Not Found.",
            });
        }

        token = token.split(" ")[1];
        
        const verify = jwt.verify(token, process.env.JWT_KEY_SECRET);
        const user = await User.findByPk(verify.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        return res.json({
            message: "User retrieved successfully.",
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Some error occurred while retrieving user.",
            data: null,
        });
    }
};
