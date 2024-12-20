const Procedimentos = require('../models/procedimentosModel');

const procedimentoController = {

    createProcedimento: (req, res) => {
        const newProcedimento = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            valor: req.body.valor
        };

        // Validação básica dos campos
        if (!newProcedimento.nome || !newProcedimento.descricao || !newProcedimento.valor) {
            return res.status(400).json({ error: 'Os campos nome, descrição e valor são obrigatórios.' });
        }

        Procedimentos.create(newProcedimento, (err, procedimentoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    },

    getProcedimentoById: (req, res) => {
        const procedimentoId = req.params.id;

        Procedimentos.findById(procedimentoId, (err, procedimento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado.' });
            }
            res.render('procedimentos/show', { procedimento });
        });
    },

    getAllProcedimentos: (req, res) => {
        Procedimentos.getAll((err, procedimentos) => {
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
        const procedimentoId = req.params.id;

        Procedimentos.findById(procedimentoId, (err, procedimento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado.' });
            }
            res.render('procedimentos/edit', { procedimento });
        });
    },

    updateProcedimento: (req, res) => {
        const procedimentoId = req.params.id;

        const updatedProcedimento = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            valor: req.body.valor
        };

        // Validação básica dos campos
        if (!updatedProcedimento.nome || !updatedProcedimento.descricao || !updatedProcedimento.valor) {
            return res.status(400).json({ error: 'Os campos nome, descrição e valor são obrigatórios.' });
        }

        Procedimentos.update(procedimentoId, updatedProcedimento, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    },

    deleteProcedimento: (req, res) => {
        const procedimentoId = req.params.id;

        Procedimentos.delete(procedimentoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    }
};

module.exports = procedimentoController;
