const produtos = require('../models/produtosModel');

const produtoController = {
    createprodutos: async (req, res) => {
        try {
            const newprodutos = {
                foto: req.body.foto,
                restricao: req.body.restricao,
                valor: req.body.valor,
                indicacao: req.body.indicacao,
                marca: req.body.marca,
                descricao: req.body.descricao,
                cod: req.body.cod,
                items_proce: req.body.items_proce // Alterado para items_proce
            };

            await produtos.create(newprodutos);
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getprodutosById: async (req, res) => {
        const produtosId = req.params.cod;

        try {
            const produtos = await produtos.findById(produtosId);
            if (!produtos) {
                return res.status(404).json({ message: 'produtos não encontrado' });
            }
            res.render('produtos/show', { produtos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
    getAllProdutos: async (req, res) => {
        try {
            const produtos = await Produtos.getAll();
            res.render('produtos/index', { produtos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    renderEditForm: async (req, res) => {
        const produtosId = req.params.cod;

        try {
            const produtos = await Produtos.findById(produtosId);
            if (!produtos) {
                return res.status(404).json({ message: 'Produtos não encontrado' });
            }
            res.render('produtos/edit', { produtos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProdutos: async (req, res) => {
        const produtosId = req.params.cod;
        
        const updatedProdutos = {
            foto: req.body.foto,
            restricao: req.body.restricao,
            valor: req.body.valor,
            indicacao: req.body.indicacao,
            marca: req.body.marca,
            descricao: req.body.descricao,
            items_proce: req.body.items_proce // Alterado para items_proce
        };

        try {
            await produtos.update(produtosId, updatedprodutos);
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteprodutos: async (req, res) => {
        const produtosId = req.params.cod;

        try {
            await produtos.delete(produtosId);
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtosController;
