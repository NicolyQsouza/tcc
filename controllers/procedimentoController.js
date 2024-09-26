const Procedimento = require('../models/procedimentoModel');

const procedimentoController = {
    createProcedimento: (req, res) => {
        const newProcedimento = {
            duracao: req.body.duracao,
            restricao: req.body.restricao,
            descricao: req.body.descricao,
            cod: req.body.cod,
            nome: req.body.nome,
            valor: req.body.valor,
        };

        Procedimento.create(newProcedimento, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    },

    getProcedimentoById: (req, res) => {
        const procedimentoId = req.params.cod;

        Procedimento.findById(procedimentoId, (err, procedimento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado' });
            }
            res.render('procedimentos/show', { procedimento });
        });
    },

    getAllProcedimentos: (req, res) => {
        Procedimento.getAll((err, procedimentos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('procedimentos/index', { procedimentos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('procedimentos/create');
    },

    renderEditForm: (req, res) => {
        const procedimentoId = req.params.cod;

        Procedimento.findById(procedimentoId, (err, procedimento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado' });
            }
            res.render('procedimentos/edit', { procedimento });
        });
    },

    updateProcedimento: (req, res) => {
        const procedimentoId = req.params.cod;
        const updatedProcedimento = {
            duracao: req.body.duracao,
            restricao: req.body.restricao,
            descricao: req.body.descricao,
            nome: req.body.nome,
            valor: req.body.valor,
        };

        Procedimento.update(procedimentoId, updatedProcedimento, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    },

    deleteProcedimento: (req, res) => {
        const procedimentoId = req.params.cod;

        Procedimento.delete(procedimentoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    },

    searchProcedimentos: (req, res) => {
        const search = req.query.search || '';

        Procedimento.searchByName(search, (err, procedimentos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ procedimentos });
        });
    },
};

module.exports = procedimentoController;
