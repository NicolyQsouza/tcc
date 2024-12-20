const ItemsProce = require('../models/items_proceModel'); // Ajuste o caminho conforme necessário

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
        ItemsProce.getProcedimentos((err, procedimentos) => {
            if (err) {
                console.error('Erro ao carregar procedimentos:', err);
                return res.status(500).json({ error: 'Erro ao carregar o formulário de criação.' });
            }
            ItemsProce.getProdutos((err, produtos) => {
                if (err) {
                    console.error('Erro ao carregar produtos:', err);
                    return res.status(500).json({ error: 'Erro ao carregar o formulário de criação.' });
                }
                res.render('items_proce/create', { procedimentos, produtos });
            });
        });
    },

    createItemProce: (req, res) => {
        const { procedimentos, produtos, quantidade } = req.body;

        if (!procedimentos || !produtos || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios e quantidade deve ser maior que zero.' });
        }

        const newItemProce = { procedimentos, produtos, quantidade };
        ItemsProce.create(newItemProce, (err) => {
            if (err) {
                console.error('Erro ao criar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao criar item_proce.' });
            }
            res.redirect('/items_proce');
        });
    },

    getItemProceById: (req, res) => {
        ItemsProce.getById(req.params.id, (err, itemProce) => {
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
        ItemsProce.getById(req.params.id, (err, itemProce) => {
            if (err) {
                console.error('Erro ao carregar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
            }
            if (!itemProce) {
                return res.status(404).json({ message: 'Item_proce não encontrado.' });
            }
            ItemsProce.getProcedimentos((err, procedimentos) => {
                if (err) {
                    console.error('Erro ao carregar procedimentos:', err);
                    return res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
                }
                ItemsProce.getProdutos((err, produtos) => {
                    if (err) {
                        console.error('Erro ao carregar produtos:', err);
                        return res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
                    }
                    res.render('items_proce/edit', { itemProce, procedimentos, produtos });
                });
            });
        });
    },

    updateItemProce: (req, res) => {
        const { procedimentos, produtos, quantidade } = req.body;

        if (!procedimentos || !produtos || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios e quantidade deve ser maior que zero.' });
        }

        const updatedItemProce = { procedimentos, produtos, quantidade };
        ItemsProce.update(req.params.id, updatedItemProce, (err) => {
            if (err) {
                console.error('Erro ao atualizar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao atualizar item_proce.' });
            }
            res.redirect('/items_proce');
        });
    },

    deleteItemProce: (req, res) => {
        ItemsProce.delete(req.params.id, (err) => {
            if (err) {
                console.error('Erro ao deletar item_proce:', err);
                return res.status(500).json({ error: 'Erro ao deletar item_proce.' });
            }
            res.redirect('/items_proce');
        });
    }
};

module.exports = itemsProceController;
