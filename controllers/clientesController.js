const Clientes = require('../models/clientesModel');  // Importando o modelo de clientes

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

        // Verificação de formato da data (caso seja necessário)
        if (!newCliente.data_de_nascimento || isNaN(Date.parse(newCliente.data_de_nascimento))) {
            return res.status(400).json({ error: 'A data de nascimento é inválida.' });
        }

        // Usando o modelo para salvar o novo cliente
        Clientes.create(newCliente, (err, clienteId) => {
            if (err) {
                console.error('Erro ao criar cliente:', err);
                return res.status(500).json({ error: 'Erro ao criar cliente: ' + err.message });
            }
            res.redirect('/clientes');  // Redireciona para a página de listagem de clientes
        });
    },

    // Obter todos os clientes
    getAllClientes: (req, res) => {
        Clientes.getAll((err, clientes) => {
            if (err) {
                console.error('Erro ao obter clientes:', err);
                return res.status(500).json({ error: 'Erro ao obter clientes: ' + err.message });
            }
            res.render('clientes/index', { clientes });  // Renderiza a lista de clientes
        });
    },

    // Obter um cliente específico pelo código
    getClienteById: (req, res) => {
        const clienteCod = req.params.cod;

        Clientes.getByCod(clienteCod, (err, cliente) => {
            if (err) {
                console.error('Erro ao buscar cliente:', err);
                return res.status(500).json({ error: 'Erro ao buscar cliente: ' + err.message });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/show', { cliente });  // Renderiza os detalhes do cliente
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('clientes/create');  // Renderiza o formulário de criação de cliente
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const clienteCod = req.params.cod;

        // Recuperar cliente para edição
        Clientes.getByCod(clienteCod, (err, cliente) => {
            if (err) {
                console.error('Erro ao buscar cliente para edição:', err);
                return res.status(500).json({ error: 'Erro ao buscar cliente para edição: ' + err.message });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/edit', { cliente });  // Renderiza o formulário de edição do cliente
        });
    },

    // Atualizar um cliente
    updateCliente: (req, res) => {
        const clienteCod = req.params.cod;
        const updatedCliente = {
            nome: req.body.nome,
            genero: req.body.genero,
            endereco: req.body.endereco,
            fone: req.body.fone,
            email: req.body.email,
            data_de_nascimento: req.body.data_de_nascimento
        };

        console.log('Dados recebidos:', updatedCliente);  // Adicionando o log para verificação

        // Validação básica
        if (!updatedCliente.nome || !updatedCliente.fone || !updatedCliente.email) {
            return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
        }

        // Verificação de formato da data
        if (!updatedCliente.data_de_nascimento || isNaN(Date.parse(updatedCliente.data_de_nascimento))) {
            return res.status(400).json({ error: 'A data de nascimento é inválida.' });
        }

        // Atualizar no banco de dados
        Clientes.update(clienteCod, updatedCliente, (err) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                return res.status(500).json({ error: 'Erro ao atualizar cliente: ' + err.message });
            }
            res.redirect('/clientes');  // Redireciona para a página de listagem de clientes
        });
    },

    // Deletar um cliente
    deleteCliente: (req, res) => {
        const clienteCod = req.params.cod;

        Clientes.delete(clienteCod, (err) => {
            if (err) {
                console.error('Erro ao deletar cliente:', err);
                return res.status(500).json({ error: 'Erro ao deletar cliente: ' + err.message });
            }
            res.redirect('/clientes');  // Redireciona para a página de listagem de clientes
        });
    }
};

module.exports = clientesController;  // Exporta o controlador
