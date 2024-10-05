const Produto = require('../models/produtosModel');

const produtoController = {
    createProduto: async (req, res) => {
        try {
            const newProduto = {
                foto: req.body.foto,
                restricao: req.body.restricao,
                valor: req.body.valor,
                indicacao: req.body.indicacao,
                marca: req.body.marca,
                descricao: req.body.descricao,
                cod: req.body.cod,
                items_proce: req.body.items_proce // Alterado para items_proce
            };

            await Produto.create(newProduto);
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProdutoById: async (req, res) => {
        const produtoId = req.params.cod;

        try {
            const produto = await Produto.findById(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
    getAllProdutos: async (req, res) => {
        try {
            const produtos = await Produto.getAll();
            res.render('produtos/index', { produtos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    renderEditForm: async (req, res) => {
        const produtoId = req.params.cod;

        try {
            const produto = await Produto.findById(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/edit', { produto });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProduto: async (req, res) => {
        const produtoId = req.params.cod;
        
        const updatedProduto = {
            foto: req.body.foto,
            restricao: req.body.restricao,
            valor: req.body.valor,
            indicacao: req.body.indicacao,
            marca: req.body.marca,
            descricao: req.body.descricao,
            items_proce: req.body.items_proce // Alterado para items_proce
        };

        try {
            await Produto.update(produtoId, updatedProduto);
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteProduto: async (req, res) => {
        const produtoId = req.params.cod;

        try {
            await Produto.delete(produtoId);
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;
