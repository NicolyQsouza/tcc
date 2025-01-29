const Agenda = require('../models/agendaModel');
const Clientes = require('../models/clientesModel');

const agendaController = {
    // Criar nova agenda
    create: (req, res) => {
        const newAgenda = {
            clientes: req.body.clientes,
            procedimentos: req.body.procedimentos,
            profissional: req.body.profissional,
            forma_pag: req.body.forma_pag,
            data: req.body.data,
            hora: req.body.hora,
        };

        // Verificar se todos os campos estão preenchidos
        if (!Object.values(newAgenda).every((field) => field)) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Criar a agenda
        Agenda.create(newAgenda, (err, agendaId) => {
            if (err) {
                console.error('Erro ao criar agenda:', err);
                return res.status(500).json({ message: 'Erro ao criar agenda.', error: err });
            }

            // Redirecionar para a página de listagem de agendas
            res.redirect('/agenda');
        });
    },

    // Obter todas as agendas
    getAll: (req, res) => {
        Agenda.getAll((err, agendas) => {
            if (err) {
                console.error('Erro ao obter agendas:', err);
                return res.status(500).json({ message: 'Erro ao carregar agendas.', error: err });
            }
            res.render('agenda/index', { agendas });
        });
    },

    // Obter uma agenda específica
    getAgendaById: (req, res) => {
        const agendaCod = req.params.cod;

        Agenda.getById(agendaCod, (err, agenda) => {
            if (err || !agenda) {
                console.error('Erro ao buscar agenda:', err || 'Agenda não encontrada');
                return res.status(404).json({ message: 'Agenda não encontrada' });
            }

            // Corrigir nome dos campos ao passar para a view
            res.render('agenda/show', {
                agenda: {
                    ...agenda,
                    clientesNome: agenda.clientes ? agenda.clientes.nome : '',
                    procedimentosNome: agenda.procedimentos ? agenda.procedimentos.nome : ''
                }
            });
        });
    },

    // Renderizar formulário de criação
    renderCreateForm: (req, res) => {
        Clientes.getAllCliente((err, clientes) => {
            if (err) return res.status(500).json({ message: 'Erro ao carregar clientes.', error: err });

            Agenda.getProcedures((err, procedimentos) => {
                if (err) return res.status(500).json({ message: 'Erro ao carregar procedimentos.', error: err });

                res.render('agenda/create', { clientes, procedimentos });
            });
        });
    },

    // Renderizar formulário de edição
    renderEditForm: (req, res) => {
        const agendaCod = req.params.cod;

        Agenda.getById(agendaCod, (err, agenda) => {
            if (err || !agenda) {
                console.error('Erro ao buscar agenda:', err || 'Agenda não encontrada');
                return res.status(404).json({ message: 'Agenda não encontrada' });
            }

            Clientes.getAllCliente((err, clientes) => {
                if (err) return res.status(500).json({ message: 'Erro ao carregar clientes', error: err });

                Agenda.getProcedures((err, procedimentos) => {
                    if (err) return res.status(500).json({ message: 'Erro ao carregar procedimentos', error: err });

                    res.render('agenda/edit', { agenda, clientes, procedimentos });
                });
            });
        });
    },

    // Atualizar agenda
    update: (req, res) => {
        const agendaCod = req.params.cod;
        const updatedAgenda = {
            clientes: req.body.clientes,
            procedimentos: req.body.procedimentos,
            profissional: req.body.profissional,
            forma_pag: req.body.forma_pag,
            data: req.body.data,
            hora: req.body.hora,
        };

        // Verificar se todos os campos estão preenchidos
        if (!Object.values(updatedAgenda).every((field) => field)) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Atualizar agenda
        Agenda.update(agendaCod, updatedAgenda, (err, success) => {
            if (err || !success) {
                console.error('Erro ao atualizar agenda:', err);
                return res.status(500).json({ message: 'Erro ao atualizar agenda.', error: err });
            }
            res.redirect('/agenda');
        });
    },

    // Deletar agenda
    delete: (req, res) => {
        const agendaCod = req.params.cod;

        // Deletar agenda
        Agenda.delete(agendaCod, (err, success) => {
            if (err || !success) {
                console.error('Erro ao deletar agenda:', err);
                return res.status(500).json({ message: 'Erro ao deletar agenda.', error: err });
            }
            res.redirect('/agenda');
        });
    },
};

module.exports = agendaController;
