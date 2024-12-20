const Clientes = require('../models/clientesModel');

const clientesController = {
    // Criar um novo cliente
    createCliente: (req, res) => {
        const newCliente = {
            nome: req.body.nome,
            genero: req.body.genero,
            endereco: req.body.endereco,
            fone: req.body.fone,
            email: req.body.email,
            data_de_nascimento: req.body.data_de_nascimento
        };

        // Validação básica dos campos
        if (!newCliente.nome || !newCliente.fone || !newCliente.email) {
            return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
        }

        // Usando o modelo para salvar o novo cliente
        Clientes.create(newCliente, (err, clienteId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    // Obter todos os clientes
    getAllClientes: (req, res) => {
        Clientes.getAll((err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('clientes/index', { clientes });
        });
    },

    // Obter um cliente específico pelo código
    getClienteById: (req, res) => {
        const clienteId = req.params.cod;

        Clientes.getById(clienteId, (err, cliente) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/show', { cliente });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('clientes/create');
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const clienteId = req.params.cod;

        Clientes.getById(clienteId, (err, cliente) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/edit', { cliente });
        });
    },

    // Atualizar um cliente
    updateCliente: (req, res) => {
        const clienteId = req.params.cod;

        const updatedCliente = {
            nome: req.body.nome,
            genero: req.body.genero,
            endereco: req.body.endereco,
            fone: req.body.fone,
            email: req.body.email,
            data_de_nascimento: req.body.data_de_nascimento
        };

        // Validação básica
        if (!updatedCliente.nome || !updatedCliente.fone || !updatedCliente.email) {
            return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
        }

        Clientes.update(clienteId, updatedCliente, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    // Deletar um cliente
    deleteCliente: (req, res) => {
        const clienteId = req.params.cod;

        Clientes.delete(clienteId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    // Buscar clientes pelo nome
    searchClientes: (req, res) => {
    const search = req.query.search || ''; // Captura o valor da busca ou uma string vazia caso não haja pesquisa

    // Faz a busca no banco de dados
    Clientes.searchByName(search, (err, clientes) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        // Passa os resultados para a view, incluindo o valor da busca
        res.render('clientes/index', { clientes, search });
    });
}

};

module.exports = clientesController;
