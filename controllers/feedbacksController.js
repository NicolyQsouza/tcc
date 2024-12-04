const feedbacksModel = require('../models/feedbacksModel');

const feedbacksController = {
    // Criar um novo feedback
    createFeedback: async (req, res) => {
        try {
            const { foto, comentario, avaliacao, clientes } = req.body;

            // Validação básica
            if (!comentario || !avaliacao || !clientes) {
                return res.status(400).json({ error: 'Os campos comentario, avaliacao e clientes são obrigatórios.' });
            }

            if (avaliacao < 1 || avaliacao > 5) {
                return res.status(400).json({ error: 'A avaliação deve estar entre 1 e 5.' });
            }

            const newFeedback = { foto, comentario, avaliacao, clientes };
            const feedbackId = await feedbacksModel.create(newFeedback);

            res.status(201).json({ message: 'Feedback criado com sucesso', feedbackId });
        } catch (err) {
            console.error('Erro ao criar feedback:', err);
            res.status(500).json({ error: 'Erro ao criar feedback.' });
        }
    },

    // Obter todos os feedbacks
    getAllFeedbacks: async (req, res) => {
        try {
            const feedbacks = await feedbacksModel.getAll();
            res.status(200).json(feedbacks);
        } catch (err) {
            console.error('Erro ao buscar feedbacks:', err);
            res.status(500).json({ error: 'Erro ao buscar feedbacks.' });
        }
    },

    // Obter um feedback específico pelo ID
    getFeedbackById: async (req, res) => {
        const feedbackId = req.params.id;

        try {
            const feedback = await feedbacksModel.getById(feedbackId);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback não encontrado.' });
            }

            res.status(200).json(feedback);
        } catch (err) {
            console.error('Erro ao buscar feedback:', err);
            res.status(500).json({ error: 'Erro ao buscar feedback.' });
        }
    },

    // Atualizar um feedback
    updateFeedback: async (req, res) => {
        const feedbackId = req.params.id;
        const { foto, comentario, avaliacao, clientes } = req.body;

        try {
            // Validação básica
            if (avaliacao && (avaliacao < 1 || avaliacao > 5)) {
                return res.status(400).json({ error: 'A avaliação deve estar entre 1 e 5.' });
            }

            const updatedFeedback = { foto, comentario, avaliacao, clientes };
            const result = await feedbacksModel.update(feedbackId, updatedFeedback);

            if (!result) {
                return res.status(404).json({ message: 'Feedback não encontrado para atualização.' });
            }

            res.status(200).json({ message: 'Feedback atualizado com sucesso.' });
        } catch (err) {
            console.error('Erro ao atualizar feedback:', err);
            res.status(500).json({ error: 'Erro ao atualizar feedback.' });
        }
    },

    // Deletar um feedback
    deleteFeedback: async (req, res) => {
        const feedbackId = req.params.id;

        try {
            const result = await feedbacksModel.delete(feedbackId);

            if (!result) {
                return res.status(404).json({ message: 'Feedback não encontrado para exclusão.' });
            }

            res.status(200).json({ message: 'Feedback deletado com sucesso.' });
        } catch (err) {
            console.error('Erro ao deletar feedback:', err);
            res.status(500).json({ error: 'Erro ao deletar feedback.' });
        }
    },
};

module.exports = feedbacksController;
