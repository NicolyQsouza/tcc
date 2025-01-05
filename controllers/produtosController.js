const Produtos = require('../models/produtosModel');

const produtoController = {

    // Criar um novo produto
    createProduto: (req, res) => {
        const { nome, valor, marca, descricao, foto } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !valor) {
            return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
        }

        const newProduto = { nome, valor, marca, descricao, foto };
        Produtos.create(newProduto, (err, produtoId) => {
            if (err) {
                console.error('Erro ao criar produto:', err);
                return res.status(500).json({ error: 'Erro ao criar produto.' });
            }
            res.redirect('/produtos');
        });
    },

    // Buscar produto por ID
    getProdutosById: (req, res) => {
        const produtoId = req.params.id;

        Produtos.getById(produtoId, (err, produto) => {
            if (err) {
                console.error('Erro ao buscar produto por ID:', err);
                return res.status(500).json({ error: 'Erro ao buscar produto.' });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produtos: produto });
        });
    },

    // Obter todos os produtos
    getAllProdutos: (req, res) => {
        Produtos.getAll((err, produtos) => {
            if (err) {
                console.error('Erro ao buscar produtos:', err);
                return res.status(500).json({ error: 'Erro ao buscar produtos.' });
            }
            res.render('produtos/index', { produtos });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produtos.getById(produtoId, (err, produto) => {
            if (err) {
                console.error('Erro ao carregar formulário de edição:', err);
                return res.status(500).json({ error: 'Erro ao carregar formulário de edição.' });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/edit', { produtos: produto });
        });
    },

    // Atualizar um produto
    updateProdutos: (req, res) => {
        const produtoId = req.params.id;
        const { nome, valor, marca, descricao, foto } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !valor) {
            return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
        }

        const updatedProduto = { nome, valor, marca, descricao, foto };

        Produtos.update(produtoId, updatedProduto, (err) => {
            if (err) {
                console.error('Erro ao atualizar produto:', err);
                return res.status(500).json({ error: 'Erro ao atualizar produto.' });
            }
            res.redirect('/produtos');
        });
    },

    // Deletar um produto
    deleteProdutos: (req, res) => {
        const produtoId = req.params.id;

        Produtos.delete(produtoId, (err) => {
            if (err) {
                console.error('Erro ao deletar produto:', err);
                return res.status(500).json({ error: 'Erro ao deletar produto.' });
            }
            res.redirect('/produtos');
        });
    },

    // Buscar produtos por nome (pesquisa)
    searchProduto: (req, res) => {
        const search = req.query.search || '';

        Produtos.searchByName(search, (err, produtos) => {
            if (err) {
                console.error('Erro ao pesquisar produtos:', err);
                return res.status(500).json({ error: 'Erro ao pesquisar produtos.' });
            }
            res.json({ produtos });
        });
    }
};

module.exports = produtoController;
