const Produtos = require('../models/produtosModel');

const produtoController = {
    // Criar um novo produto
    createProduto: async (req, res) => {
        try {
            const { nome, valor, marca, descricao, foto} = req.body;

            // Validação de campos obrigatórios
            if (!nome || !valor  ) {
                return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
            }

            const newProduto = { nome, valor, marca, descricao, foto};
            await Produtos.create(newProduto);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao criar produto:', err);
            res.status(500).json({ error: 'Erro ao criar produto.' });
        }
    },

    // Buscar produto por ID
    getProdutosById: async (req, res) => {
        const produtoId = req.params.id;

        try {
            const produtoEncontrado = await Produtos.getById(produtoId);
            if (!produtoEncontrado) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produto: produtoEncontrado });
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
            console.log ('produtos localizados no BD'+produtos[0].nome);
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    // Renderizar o formulário de edição
    renderEditForm: async (req, res) => {
        const produtoId = req.params.id;

        try {
            const produtoEncontrado = await Produtos.getById(produtoId);
            if (!produtoEncontrado) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/edit', { produto: produtoEncontrado });
        } catch (err) {
            console.error('Erro ao carregar formulário de edição:', err);
            res.status(500).json({ error: 'Erro ao carregar formulário de edição.' });
        }
    },

    // Atualizar um produto
    updateProdutos: async (req, res) => {
        const produtoId = req.params.id;
        const { nome, valor, marca, descricao, foto } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !senha) {
            return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
        }

        const updatedProduto = { nome, valor, marca, descricao, foto };

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
        const produtoId = req.params.id;

        try {
            await Produtos.delete(produtoId);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({ error: 'Erro ao deletar produto.' });
        }
    },

    // Buscar produtos por nome (pesquisa)
    searchProduto: async (req, res) => {
        const search = req.query.search || '';

        try {
            const produtos = await Produtos.searchByName(search);
            res.json({ produtos });
        } catch (err) {
            console.error('Erro ao pesquisar produtos:', err);
            res.status(500).json({ error: 'Erro ao pesquisar produtos.' });
        }
    },
};

module.exports = produtoController;
