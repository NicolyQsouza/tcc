const Feedback = require('../models/Feedback');

exports.getAllFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.getAll();
    res.render('feedback/index', { feedbacks });
};

exports.renderCreateForm = async (req, res) => {
    // Assuming you have a method to fetch clients for the form
    const clients = await Feedback.getClients();
    res.render('feedback/create', { clients });
};

exports.createFeedback = async (req, res) => {
    const { foto, comentario, cod, avaliacao, cliente } = req.body;
    const feedback = { foto, comentario, cod, avaliacao, cliente };
    await Feedback.create(feedback);
    res.redirect('/feedbacks');
};

exports.getFeedbackById = async (req, res) => {
    const feedback = await Feedback.getById(req.params.id);
    res.render('feedback/show', { feedback });
};

exports.renderEditForm = async (req, res) => {
    const feedback = await Feedback.getById(req.params.id);
    const clients = await Feedback.getClients();
    res.render('feedback/edit', { feedback, clients });
};

exports.updateFeedback = async (req, res) => {
    const { foto, comentario, avaliacao, cliente } = req.body;
    const updatedFeedback = { foto, comentario, avaliacao, cliente };
    await Feedback.update(req.params.id, updatedFeedback);
    res.redirect('/feedbacks');
};

exports.deleteFeedback = async (req, res) => {
    await Feedback.delete(req.params.id);
    res.redirect('/feedbacks');
};
