const Feedback = require('../models/feedbacksModel');
const Cliente = require('../models/clientesModel');

const feedbackController = {
    // Função para criar um feedback
    create: (req, res) => {
        const newFeedback = {
            cliente: req.body.cliente,
            foto: req.body.foto,
            comentario: req.body.comentario,
            avaliacao: req.body.avaliacao
        };
        console.log(req.body.cliente);
        Feedback.create(newFeedback, (err, feedbackCod) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar feedback: ' + err.message });
            }
            res.redirect('/feedbacks');
        });
    },

    // Função para buscar um feedback pelo ID
    getById: (req, res) => {
        const feedbackCod = req.params.cod;

        Feedback.findById(feedbackCod, (err, feedback) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar feedback: ' + err.message });
            }
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback não encontrado' });
            }
            res.render('feedbacks/show', { feedback });
        });
    },

    // Função para pegar todos os feedbacks
    getAll: (req, res) => {
        Feedback.getAll((err, feedbacks) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar feedbacks: ' + err.message });
            }
            res.render('feedbacks/index', { feedbacks });
        });
    },

    // Função para renderizar o formulário de criação de feedback
    renderCreateForm: (req, res) => {
        Cliente.getAll((err, clientes) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar clientes: ' + err.message });
            }
            res.render('feedbacks/create', { clientes });
        });
    },

    // Função para renderizar o formulário de edição de feedback
    renderEditForm: (req, res) => {
        const feedbackCod = req.params.cod;

        Feedback.findById(feedbackCod, (err, feedback) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar feedback: ' + err.message });
            }
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback não encontrado' });
            }

            Cliente.getAll((err, clientes) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao buscar clientes: ' + err.message });
                }
                res.render('feedbacks/edit', { feedback, clientes });
            });
        });
    },

    // Função para atualizar um feedback
    update: (req, res) => {
        const feedbackCod = req.params.cod;

        const updatedFeedback = {
            cliente: req.body.cliente,
            foto: req.body.foto,  // Caso a foto não seja alterada, manterá o valor anterior
            comentario: req.body.comentario,
            avaliacao: req.body.avaliacao
        };

        console.log('Código do feedback:', feedbackCod);  // Adiciona para debug

        // Chama a função de update do modelo para atualizar o feedback no banco
        Feedback.update(feedbackCod, updatedFeedback, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao atualizar feedback: ' + err.message });
            }
            res.redirect('/feedbacks');
        });
    },

    // Função para deletar um feedback
    delete: (req, res) => {
        const feedbackCod = req.params.cod;

        Feedback.delete(feedbackCod, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao deletar feedback: ' + err.message });
            }
            res.redirect('/feedbacks');
        });
    }
};

module.exports = feedbackController;
