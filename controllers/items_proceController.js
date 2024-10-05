const ItemsProce = require('../models/itemsProce'); // Altere o caminho para o modelo correto

exports.getAllItemsProce = async (req, res) => {
    try {
        const itemsProce = await ItemsProce.getAll();
        res.render('items_proce/index', { itemsProce });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.renderCreateForm = async (req, res) => {
    try {
        const procedimentos = await ItemsProce.getProcedimentos();
        const produtos = await ItemsProce.getProdutos();
        res.render('items_proce/create', { procedimentos, produtos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createItemsProce = async (req, res) => {
    try {
        const { procedimento, produto, quantidade } = req.body;
        const itemsProce = { procedimento, produto, quantidade };
        await ItemsProce.create(itemsProce);
        res.redirect('/items_proce');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getItemsProceById = async (req, res) => {
    try {
        const itemsProce = await ItemsProce.getById(req.params.id);
        if (!itemsProce) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.render('items_proce/show', { itemsProce });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const itemsProce = await ItemsProce.getById(req.params.id);
        if (!itemsProce) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        const procedimentos = await ItemsProce.getProcedimentos();
        const produtos = await ItemsProce.getProdutos();
        res.render('items_proce/edit', { itemsProce, procedimentos, produtos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItemsProce = async (req, res) => {
    try {
        const { procedimento, produto, quantidade } = req.body;
        const updatedItemsProce = { procedimento, produto, quantidade };
        await ItemsProce.update(req.params.id, updatedItemsProce);
        res.redirect('/items_proce');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItemsProce = async (req, res) => {
    try {
        await ItemsProce.delete(req.params.id);
        res.redirect('/items_proce');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
