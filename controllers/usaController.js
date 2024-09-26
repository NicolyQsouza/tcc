const Usa = require('../models/Usa');

exports.getAllUsas = async (req, res) => {
    const usas = await Usa.getAll();
    res.render('usa/index', { usas });
};

exports.renderCreateForm = (req, res) => {
    res.render('usa/create');
};

exports.createUsa = async (req, res) => {
    const usa = req.body;
    await Usa.create(usa);
    res.redirect('/usas');
};

exports.getUsaById = async (req, res) => {
    const usa = await Usa.getById(req.params.id);
    res.render('usa/show', { usa });
};

exports.renderEditForm = async (req, res) => {
    const usa = await Usa.getById(req.params.id);
    res.render('usa/edit', { usa });
};

exports.updateUsa = async (req, res) => {
    await Usa.update(req.params.id, req.body);
    res.redirect('/usas');
};

exports.deleteUsa = async (req, res) => {
    await Usa.delete(req.params.id);
    res.redirect('/usas');
};
