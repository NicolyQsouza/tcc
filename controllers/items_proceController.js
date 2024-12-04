const itemsProceModel = require('../models/items_proceModel'); // Ajuste o caminho conforme necessário

exports.getAllItemsProce = async (req, res) => {
    try {
        const itemsProce = await itemsProceModel.getAll();
        res.render('items_proce/index', { itemsProce });
    } catch (err) {
        console.error('Erro ao buscar itens_proce:', err);
        res.status(500).json({ error: 'Erro ao buscar os itens_proce.' });
    }
};

exports.renderCreateForm = async (req, res) => {
    try {
        const procedimentos = await itemsProceModel.getProcedimentos();
        const produtos = await itemsProceModel.getProdutos();
        res.render('items_proce/create', { procedimentos, produtos });
    } catch (err) {
        console.error('Erro ao carregar o formulário de criação:', err);
        res.status(500).json({ error: 'Erro ao carregar o formulário de criação.' });
    }
};

exports.createItemProce = async (req, res) => {
    try {
        const { procedimentos, produtos, quantidade } = req.body;

        // Validação de entrada
        if (!procedimentos || !produtos || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios e quantidade deve ser maior que zero.' });
        }

        const newItemProce = { procedimentos, produtos, quantidade };
        await itemsProceModel.create(newItemProce);
        res.redirect('/items_proce');
    } catch (err) {
        console.error('Erro ao criar item_proce:', err);
        res.status(500).json({ error: 'Erro ao criar item_proce.' });
    }
};

exports.getItemProceById = async (req, res) => {
    try {
        const itemProce = await itemsProceModel.getById(req.params.id);
        if (!itemProce) {
            return res.status(404).json({ message: 'Item_proce não encontrado.' });
        }
        res.render('items_proce/show', { itemProce });
    } catch (err) {
        console.error('Erro ao buscar item_proce por ID:', err);
        res.status(500).json({ error: 'Erro ao buscar item_proce.' });
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const itemProce = await itemsProceModel.getById(req.params.id);
        if (!itemProce) {
            return res.status(404).json({ message: 'Item_proce não encontrado.' });
        }

        const procedimentos = await itemsProceModel.getProcedimentos();
        const produtos = await itemsProceModel.getProdutos();
        res.render('items_proce/edit', { itemProce, procedimentos, produtos });
    } catch (err) {
        console.error('Erro ao carregar o formulário de edição:', err);
        res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
    }
};

exports.updateItemProce = async (req, res) => {
    try {
        const { procedimentos, produtos, quantidade } = req.body;

        // Validação de entrada
        if (!procedimentos || !produtos || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios e quantidade deve ser maior que zero.' });
        }

        const updatedItemProce = { procedimentos, produtos, quantidade };
        await itemsProceModel.update(req.params.id, updatedItemProce);
        res.redirect('/items_proce');
    } catch (err) {
        console.error('Erro ao atualizar item_proce:', err);
        res.status(500).json({ error: 'Erro ao atualizar item_proce.' });
    }
};

exports.deleteItemProce = async (req, res) => {
    try {
        await itemsProceModel.delete(req.params.id);
        res.redirect('/items_proce');
    } catch (err) {
        console.error('Erro ao deletar item_proce:', err);
        res.status(500).json({ error: 'Erro ao deletar item_proce.' });
    }
};
