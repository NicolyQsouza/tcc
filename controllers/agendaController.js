const Agenda = require('../models/agendaModel');

const agendaController = {
    // Obter todas as agendas
    getAll: (req, res) => {
        Agenda.getAll((err, agendas) => {
            if (err) {
                console.error('Erro ao buscar agendas:', err);
                return res.status(500).send('Erro ao buscar agendas.');
            }
            res.render('agenda/index', { agendas });
        });
    },

    // Renderizar formulário de criação
    renderCreateForm: (req, res) => {
        Agenda.getClients((err, clients) => {
            if (err) {
                console.error('Erro ao carregar clientes:', err);
                return res.status(500).send('Erro ao carregar formulário de criação.');
            }

            Agenda.getProcedures((err, procedures) => {
                if (err) {
                    console.error('Erro ao carregar procedimentos:', err);
                    return res.status(500).send('Erro ao carregar formulário de criação.');
                }

                res.render('agenda/create', { clients, procedures });
            });
        });
    },

    // Criar uma nova agenda
    create: (req, res) => {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        if (!clientes || !procedimentos || !profissional || !forma_pag || !data || !hora) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const newAgenda = { clientes, procedimentos, profissional, forma_pag, data, hora };

        Agenda.create(newAgenda, (err) => {
            if (err) {
                console.error('Erro ao criar agenda:', err);
                return res.status(500).send('Erro ao criar agenda.');
            }
            res.redirect('/agenda');
        });
    },

    // Obter agenda por ID
    getById: (req, res) => {
        Agenda.getById(req.params.id, (err, agenda) => {
            if (err) {
                console.error('Erro ao buscar agenda por ID:', err);
                return res.status(500).send('Erro ao buscar agenda.');
            }

            if (!agenda) {
                return res.status(404).send('Agenda não encontrada.');
            }

            res.render('agenda/show', { agenda });
        });
    },

    // Renderizar formulário de edição
    renderEditForm: (req, res) => {
        Agenda.getById(req.params.id, (err, agenda) => {
            if (err) {
                console.error('Erro ao buscar agenda para edição:', err);
                return res.status(500).send('Erro ao carregar formulário de edição.');
            }

            if (!agenda) {
                return res.status(404).send('Agenda não encontrada.');
            }

            Agenda.getClients((err, clients) => {
                if (err) {
                    console.error('Erro ao carregar clientes:', err);
                    return res.status(500).send('Erro ao carregar formulário de edição.');
                }

                Agenda.getProcedures((err, procedures) => {
                    if (err) {
                        console.error('Erro ao carregar procedimentos:', err);
                        return res.status(500).send('Erro ao carregar formulário de edição.');
                    }

                    res.render('agenda/edit', { agenda, clients, procedures });
                });
            });
        });
    },

    // Atualizar uma agenda
    update: (req, res) => {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        if (!clientes || !procedimentos || !profissional || !forma_pag || !data || !hora) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const updatedAgenda = { clientes, procedimentos, profissional, forma_pag, data, hora };

        Agenda.update(req.params.id, updatedAgenda, (err, updated) => {
            if (err) {
                console.error('Erro ao atualizar agenda:', err);
                return res.status(500).send('Erro ao atualizar agenda.');
            }

            if (!updated) {
                return res.status(404).send('Agenda não encontrada para atualização.');
            }

            res.redirect('/agenda');
        });
    },

    // Deletar uma agenda
    delete: (req, res) => {
        Agenda.delete(req.params.id, (err, deleted) => {
            if (err) {
                console.error('Erro ao deletar agenda:', err);
                return res.status(500).send('Erro ao deletar agenda.');
            }

            if (!deleted) {
                return res.status(404).send('Agenda não encontrada para exclusão.');
            }

            res.redirect('/agenda');
        });
    }
};

module.exports = agendaController;
