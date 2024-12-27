const Agenda = require('../models/agendaModel'); // Importando o modelo de agenda
const Clientes = require('../models/clientesModel'); // Importando o modelo de clientes

const agendaController = {
    // Criar um novo registro de agenda
    create: (req, res) => {
        const newAgenda = {
            clientes: req.body.clientes,
            procedimentos: req.body.procedimentos,
            profissional: req.body.profissional,
            forma_pag: req.body.forma_pag,
            data: req.body.data,
            hora: req.body.hora
        };

        // Validação básica dos campos
        if (!newAgenda.clientes || !newAgenda.procedimentos || !newAgenda.profissional || !newAgenda.forma_pag || !newAgenda.data || !newAgenda.hora) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Criar o registro de agenda
        Agenda.create(newAgenda, (err, agendaId) => {
            if (err) {
                console.error('Erro ao criar agenda:', err);
                return res.status(500).json({ error: 'Erro ao criar agenda: ' + err.message });
            }
            res.redirect('/agenda'); // Redireciona para a página de listagem de agendas
        });
    },

    // Obter todos os registros de agenda
    getAll: (req, res) => {
        Agenda.getAll((err, agendas) => {
            if (err) {
                console.error('Erro ao obter agendas:', err);
                return res.status(500).json({ error: 'Erro ao obter agendas: ' + err.message });
            }
            res.render('agenda/index', { agendas }); // Renderiza a lista de agendas
        });
    },

    // Obter um registro específico de agenda pelo código
    getAgendaById: (req, res) => {
        const agendaCod = req.params.cod;

        Agenda.getById(agendaCod, (err, agenda) => {
            if (err) {
                console.error('Erro ao buscar agenda:', err);
                return res.status(500).json({ error: 'Erro ao buscar agenda: ' + err.message });
            }
            if (!agenda) {
                return res.status(404).json({ message: 'Agenda não encontrada' });
            }

            // Carregar todos os clientes e procedimentos para a edição
            Clientes.getAllCliente((err, clientes) => {
                if (err) {
                    console.error('Erro ao obter clientes:', err);
                    return res.status(500).json({ error: 'Erro ao obter clientes: ' + err.message });
                }
                Agenda.getProcedures((err, procedimentos) => {
                    if (err) {
                        console.error('Erro ao obter procedimentos:', err);
                        return res.status(500).json({ error: 'Erro ao obter procedimentos: ' + err.message });
                    }
                    res.render('agenda/edit', { agenda, clientes, procedimentos }); // Renderiza a página de edição
                });
            });
        });
    },

    // Renderizar o formulário de criação de agenda
    renderCreateForm: (req, res) => {
        // Carregar todos os clientes e procedimentos para o formulário
        Clientes.getAllCliente((err, clientes) => {
            if (err) {
                console.error('Erro ao obter clientes:', err);
                return res.status(500).json({ error: 'Erro ao obter clientes: ' + err.message });
            }
            Agenda.getProcedures((err, procedimentos) => {
                if (err) {
                    console.error('Erro ao obter procedimentos:', err);
                    return res.status(500).json({ error: 'Erro ao obter procedimentos: ' + err.message });
                }
                res.render('agenda/create', { clientes, procedimentos }); // Renderiza o formulário de criação de agenda
            });
        });
    },

    // Atualizar um registro de agenda
    update: (req, res) => {
        const agendaCod = req.params.cod;
        const updatedAgenda = {
            clientes: req.body.clientes,
            procedimentos: req.body.procedimentos,
            profissional: req.body.profissional,
            forma_pag: req.body.forma_pag,
            data: req.body.data,
            hora: req.body.hora
        };

        // Validação básica dos campos
        if (!updatedAgenda.clientes || !updatedAgenda.procedimentos || !updatedAgenda.profissional || !updatedAgenda.forma_pag || !updatedAgenda.data || !updatedAgenda.hora) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Atualizar o registro de agenda
        Agenda.update(agendaCod, updatedAgenda, (err, success) => {
            if (err || !success) {
                console.error('Erro ao atualizar agenda:', err);
                return res.status(500).json({ error: 'Erro ao atualizar agenda: ' + err.message });
            }
            res.redirect('/agenda'); // Redireciona para a página de listagem de agendas
        });
    },

    // Deletar um registro de agenda
    delete: (req, res) => {
        const agendaCod = req.params.cod;

        Agenda.delete(agendaCod, (err, success) => {
            if (err || !success) {
                console.error('Erro ao deletar agenda:', err);
                return res.status(500).json({ error: 'Erro ao deletar agenda: ' + err.message });
            }
            res.redirect('/agenda'); // Redireciona para a página de listagem de agendas
        });
    }
};

module.exports = agendaController;
