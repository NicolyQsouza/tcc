const Procedimentos = require('../models/procedimentosModel');

const procedimentosController = {
    createProcedimentos: async (req, res) => {
        try {
            const newProcedimentos = {
                duracao: req.body.duracao,
                restricao: req.body.restricao,
                descricao: req.body.descricao,
                cod: req.body.cod,
                nome: req.body.nome,
                valor: req.body.valor,
                agenda: req.body.agenda, // Novo campo
                items_proce: req.body.items_proce, // Alterado para items_proce
            };

            await Procedimentos.create(newProcedimentos);
            res.redirect('/procedimentos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProcedimentosById: async (req, res) => {
        const procedimentosId = req.params.cod;

        try {
            const procedimentos = await procedimentos.findById(procedimentosId);
            if (!procedimentos) {
                return res.status(404).json({ message: 'procedimentos não encontrado' });
            }
            res.render('procedimentoss/show', { procedimentos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllProcedimentos: async (req, res) => {
        try {
            const procedimentos = await procedimentos.getAll();
            res.render('procedimentos/index', { procedimentos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const agenda = await procedimentos.getagenda();
            const items_proce = await procedimentos.getItemsProce(); // Alterado para items_proce
            res.render('procedimentos/create', { agenda, items_proce });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        const procedimentosId = req.params.cod;

        try {
            const procedimentos = await procedimentos.findById(procedimentosId);
            if (!procedimentos) {
                return res.status(404).json({ message: 'procedimentos não encontrado' });
            }
            const agenda = await procedimentos.getagenda();
            const items_proce = await procedimentos.getItemsProce(); // Alterado para items_proce
            res.render('procedimentos/edit', { procedimentos, agenda, items_proce });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateprocedimentos: async (req, res) => {
        const procedimentosId = req.params.cod;
        const updatedprocedimentos = {
            duracao: req.body.duracao,
            restricao: req.body.restricao,
            descricao: req.body.descricao,
            nome: req.body.nome,
            valor: req.body.valor,
            agenda: req.body.agenda, // Novo campo
            items_proce: req.body.items_proce, // Alterado para items_proce
        };

        try {
            await procedimentos.update(procedimentosId, updatedprocedimentos);
            res.redirect('/procedimentos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteprocedimentos: async (req, res) => {
        const procedimentosId = req.params.cod;

        try {
            await procedimentos.delete(procedimentosId);
            res.redirect('/procedimentos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchProcedimentos: async (req, res) => {
        const search = req.query.search || '';

        try {
            const procedimentos = await Procedimentos.searchByName(search);
            res.json({ procedimentos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = procedimentosController;
