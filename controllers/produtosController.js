const Produtos = require('../models/produtosModel');

const produtosController = {
    // Criar um novo produto
    createProdutos: async (req, res) => {
        try {
            const { foto, restricao, valor, indicacao, marca, descricao, cod, items_proce } = req.body;

            // Validação de campos obrigatórios
            if (!cod || !valor || !marca || !descricao) {
                return res.status(400).json({ error: 'Campos obrigatórios estão ausentes.' });
            }

            const newProduto = { foto, restricao, valor, indicacao, marca, descricao, cod, items_proce };
            await Produtos.create(newProduto);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao criar produto:', err);
            res.status(500).json({ error: 'Erro ao criar produto.' });
        }
    },

    // Buscar produto por ID
    getProdutosById: async (req, res) => {
        const produtoId = req.params.cod;

        try {
            const produto = await Produtos.findById(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            console.error('Erro ao buscar produto por ID:', err);
            res.status(500).json({ error: 'Erro ao buscar produto.' });
        }
    },

    // Obter todos os produtos
    getAllProdutos: async (req, res) => {
        try {
            const produtos = await Produtos.getAll();
            res.render('produtos/index', { produtos });
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    },

    // Renderizar formulário de criação
    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    // Renderizar formulário de edição
    renderEditForm: async (req, res) => {
        const produtoId = req.params.cod;

        try {
            const produto = await Produtos.findById(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            res.render('produtos/edit', { produto });
        } catch (err) {
            console.error('Erro ao carregar formulário de edição:', err);
            res.status(500).json({ error: 'Erro ao carregar formulário de edição.' });
        }
    },

    // Atualizar um produto
    updateProdutos: async (req, res) => {
        const produtoId = req.params.cod;
        const { foto, restricao, valor, indicacao, marca, descricao, items_proce } = req.body;

        if (!valor || !marca || !descricao) {
            return res.status(400).json({ error: 'Campos obrigatórios estão ausentes.' });
        }

        const updatedProduto = { foto, restricao, valor, indicacao, marca, descricao, items_proce };

        try {
            await Produtos.update(produtoId, updatedProduto);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).json({ error: 'Erro ao atualizar produto.' });
        }
    },

    // Deletar um produto
    deleteProdutos: async (req, res) => {
        const produtoId = req.params.cod;

        try {
            await Produtos.delete(produtoId);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({ error: 'Erro ao deletar produto.' });
        }
    }
};

module.exports = produtosController;
