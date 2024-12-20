const Feedback = require('../models/feedbacksModel');
const Cliente = require('../models/clientesModel');

const feedbackController = {

    create: (req, res) => {
        const newFeedback = {
            cliente: req.body.cliente,
            foto: req.body.foto,
            comentario: req.body.comentario,
            avaliacao: req.body.avaliacao
        };

        Feedback.create(newFeedback, (err, feedbackId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/feedbacks');
        });
    },

    getById: (req, res) => {
        const feedbackId = req.params.id;

        Feedback.findById(feedbackId, (err, feedback) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }
            res.render('feedbacks/show', { feedback });
        });
    },

    getAll: (req, res) => {
        Feedback.getAll((err, feedbacks) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('feedbacks/index', { feedbacks });
        });
    },

    renderCreateForm: (req, res) => {
        Cliente.getAll((err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('feedbacks/create', { clientes });
        });
    },

    renderEditForm: (req, res) => {
        const feedbackId = req.params.id;

        Feedback.findById(feedbackId, (err, feedback) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }

            Cliente.getAll((err, clientes) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('feedbacks/edit', { feedback, clientes });
            });
        });
    },

    update: (req, res) => {
        const feedbackId = req.params.id;

        const updatedFeedback = {
            cliente: req.body.cliente,
            foto: req.body.foto,
            comentario: req.body.comentario,
            avaliacao: req.body.avaliacao
        };

        Feedback.update(feedbackId, updatedFeedback, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/feedbacks');
        });
    },

    delete: (req, res) => {
        const feedbackId = req.params.id;

        Feedback.delete(feedbackId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/feedbacks');
        });
    }
};

module.exports = feedbackController;
