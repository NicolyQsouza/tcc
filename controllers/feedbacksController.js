const feedbacks = require('../models/feedbacks');

exports.getAllfeedbacks = async (req, res) => {
    const feedbacks = await feedbacks.getAll();
    res.render('feedbacks/index', { feedbacks });
};

exports.renderCreateForm = async (req, res) => {
    // Assuming you have a method to fetch clients for the form
    const clients = await feedbacks.getClients();
    res.render('feedbacks/create', { clients });
};

exports.createfeedbacks = async (req, res) => {
    const { foto, comentario, cod, avaliacao, clientes } = req.body;
    const feedbacks = { foto, comentario, cod, avaliacao, clientes };
    await feedbacks.create(feedbacks);
    res.redirect('/feedbacks');
};

exports.getfeedbacksById = async (req, res) => {
    const feedbacks = await feedbacks.getById(req.params.id);
    res.render('feedbacks/show', { feedbacks });
};

exports.renderEditForm = async (req, res) => {
    const feedbacks = await feedbacks.getById(req.params.id);
    const clients = await feedbacks.getClients();
    res.render('feedbacks/edit', { feedbacks, clients });
};

exports.updatefeedbacks = async (req, res) => {
    const { foto, comentario, avaliacao, clientes } = req.body;
    const updatedfeedbacks = { foto, comentario, avaliacao, clientes };
    await feedbacks.update(req.params.id, updatedfeedbacks);
    res.redirect('/feedbacks');
};

exports.deletefeedbacks = async (req, res) => {
    await feedbacks.delete(req.params.id);
    res.redirect('/feedbacks');
};
