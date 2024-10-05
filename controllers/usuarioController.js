const User = require('../models/userModel');

const userController = {
    createUser: async (req, res) => {
        try {
            const newUser = {
                nome: req.body.nome, // Alterado para "nome"
                senha: req.body.senha, // Alterado para "senha"
            };

            await User.create(newUser);
            res.redirect('/users');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUserById: async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('users/show', { user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.render('users/index', { users });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    renderEditForm: async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('users/edit', { user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUser: async (req, res) => {
        const userId = req.params.id;
        const updatedUser = {
            nome: req.body.nome, // Alterado para "nome"
            senha: req.body.senha, // Alterado para "senha"
        };

        try {
            await User.update(userId, updatedUser);
            res.redirect('/users');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.params.id;

        try {
            await User.delete(userId);
            res.redirect('/users');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchUsers: async (req, res) => {
        const search = req.query.search || '';

        try {
            const users = await User.searchByName(search);
            res.json({ users });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = userController;
