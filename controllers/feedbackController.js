const Feedback = require('../models/Feedback');

exports.getAllFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.getAll();
    res.render('feedback/index', { feedbacks });
};

exports.renderCreateForm = (req, res) => {
    res.render('feedback/create');
};

exports.createFeedback = async (req, res) => {
    const feedback = req.body;
    await Feedback.create(feedback);
    res.redirect('/feedbacks');
};

exports.getFeedbackById = async (req, res) => {
    const feedback = await Feedback.getById(req.params.id);
    res.render('feedback/show', { feedback });
};

exports.renderEditForm = async (req, res) => {
    const feedback = await Feedback.getById(req.params.id);
    res.render('feedback/edit', { feedback });
};

exports.updateFeedback = async (req, res) => {
    await Feedback.update(req.params.id, req.body);
    res.redirect('/feedbacks');
};

exports.deleteFeedback = async (req, res) => {
    await Feedback.delete(req.params.id);
    res.redirect('/feedbacks');
};
