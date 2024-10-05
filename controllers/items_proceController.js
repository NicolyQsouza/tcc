const items_proce = require('../models/items_proceModel'); // Altere o caminho para o modelo correto

exports.getAllitems_proce = async (req, res) => {
    try {
        const items_proce = await items_proce.getAll();
        res.render('items_proce/index', { items_proce });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.renderCreateForm = async (req, res) => {
    try {
        const procedimentos = await items_proce.getProcedimentos();
        const produtos = await items_proce.getProdutos();
        res.render('items_proce/create', { procedimentos, produtos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createitems_proce = async (req, res) => {
    try {
        const { procedimentos, produtos, quantidade } = req.body;
        const items_proce = { procedimentos, produtos, quantidade };
        await items_proce.create(items_proce);
        res.redirect('/items_proce');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getitems_proceById = async (req, res) => {
    try {
        const items_proce = await items_proce.getById(req.params.id);
        if (!items_proce) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.render('items_proce/show', { items_proce });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const items_proce = await items_proce.getById(req.params.id);
        if (!items_proce) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        const procedimentos = await items_proce.getProcedimentos();
        const produtos = await items_proce.getProdutos();
        res.render('items_proce/edit', { items_proce, procedimentos, produtos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateitems_proce = async (req, res) => {
    try {
        const { procedimentos, produtos, quantidade } = req.body;
        const updateditems_proce = { procedimentos, produtos, quantidade };
        await items_proce.update(req.params.id, updateditems_proce);
        res.redirect('/items_proce');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteitems_proce = async (req, res) => {
    try {
        await items_proce.delete(req.params.id);
        res.redirect('/items_proce');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
