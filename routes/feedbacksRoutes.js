const express = require('express');
const feedbacksController = require('../controllers/feedbacksController');
const router = express.Router();

// Rota para obter todos os feedbacks
router.get('/', async (req, res) => {
    try {
        const feedbacks = await feedbacksController.getAll();
        res.json(feedbacks); // Ou renderize uma view, se necessário
    } catch (error) {
        res.status(500).send('Erro ao obter feedbacks');
    }
});

// Rota para renderizar o formulário de criação de feedbacks
router.get('/new', (req, res) => {
    res.render('feedbacks/new'); // Ajuste o caminho da view conforme necessário
});

// Rota para criar um novo feedback
router.post('/', async (req, res) => {
    try {
        const feedbackId = await feedbacksController.create(req.body);
        res.status(201).json({ id: feedbackId }); // Retorne o ID do novo feedback
    } catch (error) {
        res.status(500).send('Erro ao criar feedback');
    }
});

// Rota para obter um feedback específico pelo ID
router.get('/:id', async (req, res) => {
    try {
        const feedback = await feedbacksController.getById(req.params.id);
        if (feedback) {
            res.json(feedback);
        } else {
            res.status(404).send('Feedback não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao obter feedback');
    }
});

// Rota para renderizar o formulário de edição de feedbacks
router.get('/:id/edit', async (req, res) => {
    try {
        const feedback = await feedbacksController.getById(req.params.id);
        if (feedback) {
            res.render('feedbacks/edit', { feedback }); // Ajuste o caminho da view
        } else {
            res.status(404).send('Feedback não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao obter feedback');
    }
});

// Rota para atualizar um feedback específico
router.put('/:id', async (req, res) => {
    try {
        await feedbacksController.update(req.params.id, req.body);
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(500).send('Erro ao atualizar feedback');
    }
});

// Rota para deletar um feedback específico
router.delete('/:id', async (req, res) => {
    try {
        await feedbacksController.delete(req.params.id);
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(500).send('Erro ao deletar feedback');
    }
});

console.log(feedbacksController); // Para verificar se as funções estão disponíveis

module.exports = router;
