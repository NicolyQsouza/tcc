const Produtos = require('../models/produtosModel');

const produtoController = {
    // Criar um novo produto (API e página)
    createProduto: (req, res) => {
        let { nome, valor, marca, descricao, foto } = req.body;
        valor = parseFloat(valor) || 0;

        const newProduto = { nome, valor, marca, descricao, foto };

        if (!newProduto.nome || !newProduto.valor) {
            return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
        }

        // Validar foto se necessário
        if (!newProduto.foto) {
            return res.status(400).json({ error: 'Foto do produto é obrigatória.' });
        }

        Produtos.create(newProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Produto criado com sucesso!' });
        });
    },

    // Buscar produto por ID (API e página)
    getProdutoById: (req, res) => {
        const produtoCod = req.params.cod;

        Produtos.getById(produtoCod, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            res.json(produto);
        });
    },

    // Obter todos os produtos (API e página)
    getAllProdutos: (req, res) => {
        Produtos.getAll((err, produtos) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produtos.' });
            }

            if (req.xhr || req.accepts('json')) {
                return res.json(produtos);
            }

            res.render('produtos/index', { produtos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    renderEditForm: (req, res) => {
        const produtoCod = req.params.cod;

        Produtos.getById(produtoCod, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            res.render('produtos/edit', { produto });
        });
    },

    updateProduto: (req, res) => {
        const produtoCod = req.params.cod;
        const { nome, valor, marca, descricao, foto } = req.body;

        const updatedProduto = { nome, valor: parseFloat(valor) || 0, marca, descricao, foto };

        Produtos.update(produtoCod, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Produto atualizado com sucesso!' });
        });
    },

    deleteProduto: (req, res) => {
        const produtoCod = req.params.cod;

        Produtos.delete(produtoCod, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Produto deletado com sucesso!' });
        });
    },

    searchProduto: (req, res) => {
        const search = req.query.search || '';

        Produtos.searchByName(search, (err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            if (req.xhr || req.accepts('json')) {
                return res.json(produtos);
            }

            res.render('produtos/search', { produtos });
        });
    }
};

module.exports = produtoController;
