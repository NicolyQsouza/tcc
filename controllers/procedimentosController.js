const Procedimentos = require('../models/procedimentosModel');

const procedimentoController = {

    createProcedimento: (req, res) => {
        let { nome, descricao, valor } = req.body;
        
        // Certificando-se de que o valor seja numérico, caso contrário atribui 0
        valor = parseFloat(valor);
        if (isNaN(valor)) {
            valor = 0;
        }

        const newProcedimento = { nome, descricao, valor };

        // Validação básica dos campos
        if (!newProcedimento.nome || !newProcedimento.descricao || isNaN(newProcedimento.valor)) {
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
        const procedimentoId = req.params.cod;

        Procedimentos.getById(procedimentoId, (err, procedimento) => {
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
        const procedimentocod = req.params.cod;
        
        Procedimentos.getById(procedimentocod, (err, procedimento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado.' });
            }
            res.render('procedimentos/edit', { procedimento });
        });
    },

    // Função para atualizar um usuário específico
    updateProcedimento: (req, res) => {
        const procedimentocod = req.params.cod;
        const procedimentoAtualizado = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            valor: req.body.valor

        };

        Procedimentos.update(procedimentocod, procedimentoAtualizado, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    },

    deleteProcedimento: (req, res) => {
        const procedimentoId = req.params.cod;

        Procedimentos.delete(procedimentoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/procedimentos');
        });
    }
};

module.exports = procedimentoController;
