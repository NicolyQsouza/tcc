const Produtos = require('../models/produtosModel');

const produtosController = {
    createProdutos: async (req, res) => {
        try {
            const newProduto = {
                foto: req.body.foto,
                restricao: req.body.restricao,
                valor: req.body.valor,
                indicacao: req.body.indicacao,
                marca: req.body.marca,
                descricao: req.body.descricao,
                cod: req.body.cod,
                items_proce: req.body.items_proce
            };

            await Produtos.create(newProduto);
            res.redirect('/produtos');
        } catch (err) {
            console.error(err); // Log do erro
            res.status(500).json({ error: err.message });
        }
    },

    getProdutosById: async (req, res) => {
        const produtosId = req.params.cod;

        try {
            const produto = await Produtos.findById(produtosId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            console.error(err); // Log do erro
            res.status(500).json({ error: err.message });
        }
    },
    
    getAllProdutos: async (req, res) => {
        try {
            const produtos = await Produtos.getAll();
            res.render('produtos/index', { produtos });
        } catch (err) {
            console.error(err); // Log do erro
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    renderEditForm: async (req, res) => {
        const produtosId = req.params.cod;

        try {
            const produto = await Produtos.findById(produtosId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/edit', { produto });
        } catch (err) {
            console.error(err); // Log do erro
            res.status(500).json({ error: err.message });
        }
    },

    updateProdutos: async (req, res) => {
        const produtosId = req.params.cod;
        
        const updatedProduto = {
            foto: req.body.foto,
            restricao: req.body.restricao,
            valor: req.body.valor,
            indicacao: req.body.indicacao,
            marca: req.body.marca,
            descricao: req.body.descricao,
            items_proce: req.body.items_proce
        };

        try {
            await Produtos.update(produtosId, updatedProduto);
            res.redirect('/produtos');
        } catch (err) {
            console.error(err); // Log do erro
            res.status(500).json({ error: err.message });
        }
    },

    deleteProdutos: async (req, res) => {
        const produtosId = req.params.cod;

        try {
            await Produtos.delete(produtosId);
            res.redirect('/produtos');
        } catch (err) {
            console.error(err); // Log do erro
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtosController;
