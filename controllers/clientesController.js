const Clientes = require('../models/clientesModel');

const clienteController = {
    // Cria um novo cliente
    createCliente: async (req, res) => {
        try {
            const { nome, genero, endereco, fone, email, data_de_nascimento } = req.body;
            // Validação básica dos campos
            if ( !nome || !fone || !email) {
                return res.status(400).json({ error: 'Os campos  nome, fone e email são obrigatórios.' });
            }

            const newCliente = {  nome, genero, endereco, fone, email, data_de_nascimento };
            await Clientes.create(newCliente);

            res.redirect('/clientes');
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            res.status(500).json({ error: 'Erro ao criar cliente.' });
        }
    },

    // Busca um cliente pelo ID (cod)
    getClienteById: async (req, res) => {
        try {
            const clienteId = req.params.cod;
            const cliente = await Clientes.findById(clienteId);

            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            res.render('clientes/show', { cliente });
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            res.status(500).json({ error: 'Erro ao buscar cliente.' });
        }
    },

    // Busca todos os clientes
    getAllClientes: async (req, res) => {
        try {
            const clientes = await Clientes.getAll();
            res.render('clientes/index', { clientes });
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            res.status(500).json({ error: 'Erro ao buscar clientes.' });
        }
    },

    // Renderiza o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('clientes/create');
    },

    // Renderiza o formulário de edição
    renderEditForm: async (req, res) => {
        try {
            const clienteId = req.params.cod;
            const cliente = await Clientes.findById(clienteId);

            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            res.render('clientes/edit', { cliente });
        } catch (error) {
            console.error('Erro ao carregar formulário de edição:', error);
            res.status(500).json({ error: 'Erro ao carregar formulário de edição.' });
        }
    },

    // Atualiza um cliente
    updateCliente: async (req, res) => {
        try {
            const clienteId = req.params.cod;
            const {  nome, genero, endereco, fone, email, data_de_nascimento } = req.body;

            // Validação básica dos campos
            if (!nome || !fone || !email) {
                return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
            }

            const updatedCliente = {  nome, genero, endereco, fone, email, data_de_nascimento};
            const updated = await Clientes.update(clienteId, updatedCliente);

            if (!updated) {
                return res.status(404).json({ message: 'Cliente não encontrado para atualização.' });
            }

            res.redirect('/clientes');
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ error: 'Erro ao atualizar cliente.' });
        }
    },

    // Exclui um cliente
    deleteCliente: async (req, res) => {
        try {
            const clienteId = req.params.cod;
            const deleted = await Clientes.delete(clienteId);

            if (!deleted) {
                return res.status(404).json({ message: 'Cliente não encontrado para exclusão.' });
            }

            res.redirect('/clientes');
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            res.status(500).json({ error: 'Erro ao excluir cliente.' });
        }
    },

    // Busca clientes pelo nome
    searchClientes: async (req, res) => {
        try {
            const search = req.query.search || '';
            const clientes = await Clientes.searchByName(search);

            res.json({ clientes });
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            res.status(500).json({ error: 'Erro ao buscar clientes.' });
        }
    },
};

module.exports = clienteController;
