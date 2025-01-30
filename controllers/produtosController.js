const Produtos = require('../models/produtosModel');
const multer = require('../config/multer'); // Importando o multer configurado

const produtoController = {
    // Criar um novo produto (API e página)
    createProduto: [multer.single('foto'), (req, res) => {
        let { nome, valor, marca, descricao } = req.body;
        const foto = req.file ? req.file.filename : null; // Foto do arquivo

        valor = parseFloat(valor) || 0;

        const newProduto = { nome, valor, marca, descricao, foto };

        if (!newProduto.nome || !newProduto.valor) {
            return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
        }

        if (!newProduto.foto) {
            return res.status(400).json({ error: 'Foto do produto é obrigatória.' });
        }

        Produtos.create(newProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar produto.' });
            }

            return res.redirect('/produtos2'); // Redireciona para a página de lista de produtos após criação
        });
    }],

    // Buscar produto por ID (API e página)
    getProdutoById: (req, res) => {
        const produtoCod = req.params.cod;

        Produtos.getById(produtoCod, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produto.' });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            return res.json(produto);
        });
    },

    // Obter todos os produtos (API e página)
    getAllProdutos: (req, res) => {
        Produtos.getAll((err, produtos) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produtos.' });
            }

            if (req.path === '/produtos2') {
                return res.render('produtos/index', { produtos });
            }

            return res.json(produtos);
        });
    },

    // Renderizar formulário de criação (página)
    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    // Renderizar formulário de edição (página)
    renderEditForm: (req, res) => {
        const produtoCod = req.params.cod;

        Produtos.getById(produtoCod, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produto.' });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            res.render('produtos/edit', { produto });
        });
    },

    // Atualizar produto
    updateProduto: [multer.single('foto'), (req, res) => {
        const produtoCod = req.params.cod;
        const { nome, valor, marca, descricao, fotoAntiga } = req.body;

        // Se houver foto nova, usa ela; caso contrário, mantém a foto antiga
        const foto = req.file ? req.file.filename : fotoAntiga;
        const valorConvertido = parseFloat(valor) || 0;

        const updatedProduto = { nome, valor: valorConvertido, marca, descricao, foto };

        Produtos.update(produtoCod, updatedProduto, (err) => {
            if (err) {
                console.error("Erro ao atualizar:", err);
                return res.status(500).json({ error: 'Erro ao atualizar produto.', details: err });
            }

            console.log("Produto atualizado com sucesso!");
            return res.redirect('/produtos/produtos2'); // Redireciona para a lista de produtos após atualização
        });
    }],

    // Deletar produto
    deleteProduto: (req, res) => {
        const produtoCod = req.params.cod;

        Produtos.delete(produtoCod, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao deletar produto.' });
            }

            return res.redirect('/produtos/produtos2'); // Redireciona para a lista de produtos após exclusão
        });
    },

    // Buscar produto por nome (API e página)
    searchProduto: (req, res) => {
        const search = req.query.search || '';

        Produtos.searchByName(search, (err, produtos) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produtos.' });
            }

            return res.render('produtos/search', { produtos });
        });
    }
};

module.exports = produtoController;
