const FeedbacksModel = require('../models/feedbacksModel');

exports.getAllFeedbacks = async (req, res) => {
    const feedbacks = await FeedbacksModel.getAll();
    res.render('feedbacks/index', { feedbacks });
};

exports.renderCreateForm = async (req, res) => {
    const clients = await FeedbacksModel.getClients();
    res.render('feedbacks/create', { clients });
};

exports.createFeedbacks = async (req, res) => {
    const { foto, comentario, cod, avaliacao, clientes } = req.body;
    const newFeedback = { foto, comentario, cod, avaliacao, clientes };
    await FeedbacksModel.create(newFeedback);
    res.redirect('/feedbacks');
};

exports.getFeedbacksById = async (req, res) => {
    const feedback = await FeedbacksModel.getById(req.params.id);
    res.render('feedbacks/show', { feedback });
};

exports.renderEditForm = async (req, res) => {
    const feedback = await FeedbacksModel.getById(req.params.id);
    const clients = await FeedbacksModel.getClients();
    res.render('feedbacks/edit', { feedback, clients });
};

exports.updateFeedbacks = async (req, res) => {
    const { foto, comentario, avaliacao, clientes } = req.body;
    const updatedFeedback = { foto, comentario, avaliacao, clientes };
    await FeedbacksModel.update(req.params.id, updatedFeedback);
    res.redirect('/feedbacks');
};

exports.deleteFeedbacks = async (req, res) => {
    await FeedbacksModel.delete(req.params.id);
    res.redirect('/feedbacks');
};
