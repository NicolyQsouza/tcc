const Procedimento = require('../models/procedimentoModel');

const procedimentoController = {
    createProcedimento: async (req, res) => {
        try {
            const newProcedimento = {
                duracao: req.body.duracao,
                restricao: req.body.restricao,
                descricao: req.body.descricao,
                cod: req.body.cod,
                nome: req.body.nome,
                valor: req.body.valor,
                agenda: req.body.agenda, // Novo campo
                items_proce: req.body.items_proce, // Alterado para items_proce
            };

            await Procedimento.create(newProcedimento);
            res.redirect('/procedimentos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProcedimentoById: async (req, res) => {
        const procedimentoId = req.params.cod;

        try {
            const procedimento = await Procedimento.findById(procedimentoId);
            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado' });
            }
            res.render('procedimentos/show', { procedimento });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllProcedimentos: async (req, res) => {
        try {
            const procedimentos = await Procedimento.getAll();
            res.render('procedimentos/index', { procedimentos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const agendas = await Procedimento.getAgendas();
            const items_proce = await Procedimento.getItemsProce(); // Alterado para items_proce
            res.render('procedimentos/create', { agendas, items_proce });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        const procedimentoId = req.params.cod;

        try {
            const procedimento = await Procedimento.findById(procedimentoId);
            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado' });
            }
            const agendas = await Procedimento.getAgendas();
            const items_proce = await Procedimento.getItemsProce(); // Alterado para items_proce
            res.render('procedimentos/edit', { procedimento, agendas, items_proce });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProcedimento: async (req, res) => {
        const procedimentoId = req.params.cod;
        const updatedProcedimento = {
            duracao: req.body.duracao,
            restricao: req.body.restricao,
            descricao: req.body.descricao,
            nome: req.body.nome,
            valor: req.body.valor,
            agenda: req.body.agenda, // Novo campo
            items_proce: req.body.items_proce, // Alterado para items_proce
        };

        try {
            await Procedimento.update(procedimentoId, updatedProcedimento);
            res.redirect('/procedimentos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteProcedimento: async (req, res) => {
        const procedimentoId = req.params.cod;

        try {
            await Procedimento.delete(procedimentoId);
            res.redirect('/procedimentos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchProcedimentos: async (req, res) => {
        const search = req.query.search || '';

        try {
            const procedimentos = await Procedimento.searchByName(search);
            res.json({ procedimentos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = procedimentoController;
