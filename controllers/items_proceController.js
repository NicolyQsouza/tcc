const ItemsProce = require('../models/items_proceModel');
const Produtos = require('../models/produtosModel');
const Procedimentos = require('../models/procedimentosModel');

const itemsProceController = {
    getAllItemsProce: (req, res) => {
        ItemsProce.getAll((err, itemsProce) => {
            if (err) {
                console.error('Erro ao buscar itens_proce:', err);
                return res.status(500).json({ error: 'Erro ao buscar os itens_proce.' });
            }
            res.render('items_proce/index', { itemsProce });
        });
    },

    renderCreateForm: (req, res) => {
        Produtos.getAll((err, produtos) => {
            if (err) {
                console.error('Erro ao carregar produtos:', err);
                return res.status(500).json({ error: 'Erro ao carregar o formulário de criação.' });
            }

            Procedimentos.getAll((err, procedimentos) => {
                if (err) {
                    console.error('Erro ao carregar procedimentos:', err);
                    return res.status(500).json({ error: 'Erro ao carregar o formulário de criação.' });
                }

                res.render('items_proce/create', { produtos, procedimentos });
            });
        });
    },

    createItemProce: (req, res) => {
        const { produto_cod, procedimento_cod, quantidade } = req.body;

        if (!produto_cod || !procedimento_cod || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Produto, Procedimento e Quantidade são obrigatórios e a quantidade deve ser maior que zero.' });
        }

        const newItemProce = { produto_cod, procedimento_cod, quantidade };
        ItemsProce.create(newItemProce, (err) => {
            if (err) {
                console.error('Erro ao criar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao criar item_proce.' });
            }
            res.redirect('/items_proce');
        });
    },

    getItemProceByCod: (req, res) => {
        ItemsProce.getById(req.params.cod, (err, itemProce) => {
            if (err) {
                console.error('Erro ao buscar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao buscar item_proce.' });
            }
            if (!itemProce) {
                return res.status(404).json({ message: 'Item_proce não encontrado.' });
            }
            res.render('items_proce/show', { itemProce });
        });
    },

    renderEditForm: (req, res) => {
        ItemsProce.getById(req.params.cod, (err, itemProce) => {
            if (err) {
                console.error('Erro ao carregar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
            }
            if (!itemProce) {
                return res.status(404).json({ message: 'Item_proce não encontrado.' });
            }

            Produtos.getAll((err, produtos) => {
                if (err) {
                    console.error('Erro ao carregar produtos:', err);
                    return res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
                }

                Procedimentos.getAll((err, procedimentos) => {
                    if (err) {
                        console.error('Erro ao carregar procedimentos:', err);
                        return res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
                    }

                    res.render('items_proce/edit', { itemProce, produtos, procedimentos });
                });
            });
        });
    },

    updateItemProce: (req, res) => {
        const { produto_cod, procedimento_cod, quantidade } = req.body;

        if (!produto_cod || !procedimento_cod || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Produto, Procedimento e Quantidade são obrigatórios e a quantidade deve ser maior que zero.' });
        }

        const updatedItemProce = { produto_cod, procedimento_cod, quantidade };
        ItemsProce.update(req.params.cod, updatedItemProce, (err) => {
            if (err) {
                console.error('Erro ao atualizar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao atualizar item_proce.' });
            }
            res.redirect('/items_proce');
        });
    },

    deleteItemProce: (req, res) => {
        ItemsProce.delete(req.params.cod, (err) => {
            if (err) {
                console.error('Erro ao deletar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao deletar item_proce.' });
            }
            res.redirect('/items_proce');
        });
    }
};

module.exports = itemsProceController;
