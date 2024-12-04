const Procedimentos = require('../models/procedimentosModel');

const procedimentosController = {
    createProcedimento: async (req, res) => {
        try {
            const { duracao, restricao, descricao, cod, nome, valor, agenda, items_proce } = req.body;

            // Validação de entrada
            if (!nome || !duracao || !valor || !cod) {
                return res.status(400).json({ error: 'Campos obrigatórios estão ausentes.' });
            }

            const newProcedimento = { duracao, restricao, descricao, cod, nome, valor, agenda, items_proce };
            await Procedimentos.create(newProcedimento);
            res.redirect('/procedimentos');
        } catch (err) {
            console.error('Erro ao criar procedimento:', err);
            res.status(500).json({ error: 'Erro ao criar procedimento.' });
        }
    },

    getProcedimentoById: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            const procedimento = await Procedimentos.findById(procedimentoId);

            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado.' });
            }

            res.render('procedimentos/show', { procedimento });
        } catch (err) {
            console.error('Erro ao buscar procedimento por ID:', err);
            res.status(500).json({ error: 'Erro ao buscar procedimento.' });
        }
    },

    getAllProcedimentos: async (req, res) => {
        try {
            const procedimentos = await Procedimentos.getAll();
            res.render('procedimentos/index', { procedimentos });
        } catch (err) {
            console.error('Erro ao buscar procedimentos:', err);
            res.status(500).json({ error: 'Erro ao buscar procedimentos.' });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const agenda = await Procedimentos.getAgenda();
            const items_proce = await Procedimentos.getItemsProce();
            res.render('procedimentos/create', { agenda, items_proce });
        } catch (err) {
            console.error('Erro ao carregar formulário de criação:', err);
            res.status(500).json({ error: 'Erro ao carregar formulário de criação.' });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            const procedimento = await Procedimentos.findById(procedimentoId);

            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado.' });
            }

            const agenda = await Procedimentos.getAgenda();
            const items_proce = await Procedimentos.getItemsProce();
            res.render('procedimentos/edit', { procedimento, agenda, items_proce });
        } catch (err) {
            console.error('Erro ao carregar formulário de edição:', err);
            res.status(500).json({ error: 'Erro ao carregar formulário de edição.' });
        }
    },

    updateProcedimento: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            const { duracao, restricao, descricao, nome, valor, agenda, items_proce } = req.body;

            if (!nome || !duracao || !valor) {
                return res.status(400).json({ error: 'Campos obrigatórios estão ausentes.' });
            }

            const updatedProcedimento = { duracao, restricao, descricao, nome, valor, agenda, items_proce };
            await Procedimentos.update(procedimentoId, updatedProcedimento);
            res.redirect('/procedimentos');
        } catch (err) {
            console.error('Erro ao atualizar procedimento:', err);
            res.status(500).json({ error: 'Erro ao atualizar procedimento.' });
        }
    },

    deleteProcedimento: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            await Procedimentos.delete(procedimentoId);
            res.redirect('/procedimentos');
        } catch (err) {
            console.error('Erro ao deletar procedimento:', err);
            res.status(500).json({ error: 'Erro ao deletar procedimento.' });
        }
    },

    searchProcedimentos: async (req, res) => {
        try {
            const search = req.query.search || '';
            const procedimentos = await Procedimentos.searchByName(search);
            res.json({ procedimentos });
        } catch (err) {
            console.error('Erro ao buscar procedimentos:', err);
            res.status(500).json({ error: 'Erro ao buscar procedimentos.' });
        }
    },
};

module.exports = procedimentosController;
