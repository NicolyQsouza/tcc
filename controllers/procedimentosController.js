const Procedimentos = require('../models/procedimentosModel');

const procedimentoController = {
    // Cria um novo procedimento
    createProcedimento: async (req, res) => {
        try {
            const {  nome, descricao, valor } = req.body;
            console.log(nome);
            // Validação básica dos campos
            if ( !nome || !descricao || !valor) {
                return res.status(400).json({ error: 'Os campos  nome, fone e email são obrigatórios.' });
            }

            const newProcedimento = {  nome, descricao, valor };
            await Procedimentos.create(newProcedimento);

            res.redirect('/procedimentos');
        } catch (error) {
            console.error('Erro ao criar procedimento:', error);
            res.status(500).json({ error: 'Erro ao criar procedimento.' });
        }
    },

    // Busca um procedimento pelo ID (cod)
    getProcedimentoById: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            const procedimento = await Procedimentos.getById(procedimentoId);

            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado.' });
            }

            res.render('procedimentos/show', { procedimento });
        } catch (error) {
            console.error('Erro ao buscar procedimento:', error);
            res.status(500).json({ error: 'Erro ao buscar procedimento.' });
        }
    },

    // Busca todos os procedimentos
    getAllProcedimentos: async (req, res) => {
        try {
            const procedimentos = await Procedimentos.getAll();
            res.render('procedimentos/index', { procedimentos });
        } catch (error) {
            console.error('Erro ao buscar procedimentos:', error);
            res.status(500).json({ error: 'Erro ao buscar procedimentos.' });
        }
    },

    // Renderiza o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('procedimentos/create');
    },

    // Renderiza o formulário de edição
    renderEditForm: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            const procedimento = await Procedimentos.findById(procedimentoId);

            if (!procedimento) {
                return res.status(404).json({ message: 'Procedimento não encontrado.' });
            }

            res.render('procedimentos/edit', { procedimento });
        } catch (error) {
            console.error('Erro ao carregar formulário de edição:', error);
            res.status(500).json({ error: 'Erro ao carregar formulário de edição.' });
        }
    },

    // Atualiza um procedimento
    updateProcedimento: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            const {  descricao, nome, valor, } = req.body;

            // Validação básica dos campos
            if (!nome || !fone || !email) {
                return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
            }

            const updatedProcedimento = { descricao, nome, valor,};
            const updated = await Procedimentos.update(procedimentoId, updatedProcedimento);

            if (!updated) {
                return res.status(404).json({ message: 'Procedimento não encontrado para atualização.' });
            }

            res.redirect('/procedimentos');
        } catch (error) {
            console.error('Erro ao atualizar procedimento:', error);
            res.status(500).json({ error: 'Erro ao atualizar procedimento.' });
        }
    },

    // Exclui um procedimento
    deleteProcedimento: async (req, res) => {
        try {
            const procedimentoId = req.params.cod;
            const deleted = await Procedimentos.delete(procedimentoId);

            if (!deleted) {
                return res.status(404).json({ message: 'Procedimento não encontrado para exclusão.' });
            }

            res.redirect('/procedimentos');
        } catch (error) {
            console.error('Erro ao excluir procedimento:', error);
            res.status(500).json({ error: 'Erro ao excluir procedimento.' });
        }
    },

    // Busca procedimentos pelo nome
    searchProcedimentos: async (req, res) => {
        try {
            const search = req.query.search || '';
            const procedimentos = await Procedimentos.searchByName(search);

            res.json({ procedimentos });
        } catch (error) {
            console.error('Erro ao buscar procedimentos:', error);
            res.status(500).json({ error: 'Erro ao buscar procedimentos.' });
        }
    },
};

module.exports = procedimentoController;
