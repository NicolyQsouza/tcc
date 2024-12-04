const Agenda = require('../models/agendaModel');

exports.getAllAgenda = async (req, res) => {
    try {
        const agenda = await Agenda.getAll();
        res.render('agenda/index', { agenda });
    } catch (error) {
        console.error('Erro ao buscar agendas:', error);
        res.status(500).send('Erro ao buscar agendas.');
    }
};

exports.renderCreateForm = async (req, res) => {
    try {
        // Supondo que você tem métodos para buscar clientes e procedimentos
        const clients = await Agenda.getClients();
        const procedures = await Agenda.getProcedures();
        res.render('agenda/create', { clients, procedures });
    } catch (error) {
        console.error('Erro ao carregar formulário de criação:', error);
        res.status(500).send('Erro ao carregar o formulário de criação.');
    }
};

exports.createAgenda = async (req, res) => {
    try {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        // Validação de entrada básica
        if (!clientes || !procedimentos || !profissional || !forma_pag || !data || !hora) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const agenda = { clientes, procedimentos, profissional, forma_pag, data, hora };
        await Agenda.create(agenda);
        res.redirect('/agenda');
    } catch (error) {
        console.error('Erro ao criar agenda:', error);
        res.status(500).send('Erro ao criar agenda.');
    }
};

exports.getAgendaById = async (req, res) => {
    try {
        const agenda = await Agenda.getById(req.params.id);

        if (!agenda) {
            return res.status(404).send('Agenda não encontrada.');
        }

        res.render('agenda/show', { agenda });
    } catch (error) {
        console.error('Erro ao buscar agenda por ID:', error);
        res.status(500).send('Erro ao buscar agenda.');
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const agenda = await Agenda.getById(req.params.id);

        if (!agenda) {
            return res.status(404).send('Agenda não encontrada.');
        }

        const clients = await Agenda.getClients();
        const procedures = await Agenda.getProcedures();
        res.render('agenda/edit', { agenda, clients, procedures });
    } catch (error) {
        console.error('Erro ao carregar formulário de edição:', error);
        res.status(500).send('Erro ao carregar formulário de edição.');
    }
};

exports.updateAgenda = async (req, res) => {
    try {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        if (!clientes || !procedimentos || !profissional || !forma_pag || !data || !hora) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const agendaData = { clientes, procedimentos, profissional, forma_pag, data, hora };
        const updated = await Agenda.update(req.params.id, agendaData);

        if (!updated) {
            return res.status(404).send('Agenda não encontrada para atualização.');
        }

        res.redirect('/agenda');
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        res.status(500).send('Erro ao atualizar agenda.');
    }
};

exports.deleteAgenda = async (req, res) => {
    try {
        const deleted = await Agenda.delete(req.params.id);

        if (!deleted) {
            return res.status(404).send('Agenda não encontrada para exclusão.');
        }

        res.redirect('/agenda');
    } catch (error) {
        console.error('Erro ao deletar agenda:', error);
        res.status(500).send('Erro ao deletar agenda.');
    }
};
