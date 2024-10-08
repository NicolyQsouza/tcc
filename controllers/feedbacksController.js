const feedbacksModel = require('../models/feedbacksModel');

const feedbacksController = {
    // Criar um novo feedback
    createFeedback: async (req, res) => {
        try {
            const { foto, comentario, avaliacao, clientes } = req.body;
            const newFeedback = {
                foto,
                comentario,
                avaliacao,
                clientes,
            };

            const feedbackId = await feedbacksModel.create(newFeedback);
            res.status(201).json({ message: 'Feedback criado com sucesso', feedbackId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter todos os feedbacks
    getAllFeedbacks: async (req, res) => {
        try {
            const feedbacks = await feedbacksModel.getAll();
            res.status(200).json(feedbacks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter um feedback específico pelo ID
    getFeedbackById: async (req, res) => {
        const feedbackId = req.params.id;
        try {
            const feedback = await feedbacksModel.getById(feedbackId);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback não encontrado' });
            }
            res.status(200).json(feedback);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Atualizar um feedback
    updateFeedback: async (req, res) => {
        const feedbackId = req.params.id;
        const { foto, comentario, avaliacao, clientes } = req.body;

        try {
            const updatedFeedback = {
                foto,
                comentario,
                avaliacao,
                clientes,
            };

            await feedbacksModel.update(feedbackId, updatedFeedback);
            res.status(200).json({ message: 'Feedback atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Deletar um feedback
    deleteFeedback: async (req, res) => {
        const feedbackId = req.params.id;

        try {
            await feedbacksModel.delete(feedbackId);
            res.status(200).json({ message: 'Feedback deletado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = feedbacksController;
