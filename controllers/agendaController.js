const Agenda = require('../models/agendaModel');
const Clientes = require('../models/clientesModel');
const Procedimentos = require('../models/procedimentosModel');

const agendaController = {
    // Obter todas as agendas
    getAll: async (req, res) => {
        try {
            const agendas = await Agenda.getAll();

            // Processar as agendas para incluir os dados dos clientes e procedimentos
            const agendaComDetalhes = await Promise.all(agendas.map(async (agenda) => {
                try {
                    const clienteData = await Clientes.getById(agenda.clientes);
                    const procedimentoData = await Procedimentos.getById(agenda.procedimentos);

                    return {
                        ...agenda,
                        clientesNome: clienteData ? clienteData.nome : 'Cliente não encontrado',
                        procedimentosNome: procedimentoData ? procedimentoData.nome : 'Procedimento não encontrado'
                    };
                } catch (err) {
                    console.error('Erro ao buscar dados do cliente ou procedimento:', err);
                    return {
                        ...agenda,
                        clientesNome: 'Cliente não encontrado',
                        procedimentosNome: 'Procedimento não encontrado'
                    };
                }
            }));

            res.render('agenda/index', { agendas: agendaComDetalhes });

        } catch (err) {
            console.error('Erro ao buscar agendas:', err);
            res.status(500).send('Erro ao buscar agendas.');
        }
    },

    // Obter os detalhes de uma agenda pelo código
    getById: async (req, res) => {
        const { cod } = req.params;
        try {
            const agenda = await Agenda.getById(cod);
            if (!agenda) {
                return res.status(404).send('Agenda não encontrada.');
            }

            const clienteData = await Clientes.getById(agenda.clientes);
            const procedimentoData = await Procedimentos.getById(agenda.procedimentos);

            res.render('agenda/detail', {
                agenda,
                clienteNome: clienteData ? clienteData.nome : 'Cliente não encontrado',
                procedimentoNome: procedimentoData ? procedimentoData.nome : 'Procedimento não encontrado'
            });
        } catch (err) {
            console.error('Erro ao buscar detalhes da agenda:', err);
            res.status(500).send('Erro ao buscar detalhes da agenda.');
        }
    },

    // Renderizar o formulário de criação de agenda
    renderCreateForm: async (req, res) => {
        try {
            // Obter clientes e procedimentos
            const clients = await Clientes.getAll();
            Procedimentos.getAll((err, procedures) => {  // Usando o callback de Procedimentos
                if (err) {
                    console.error('Erro ao carregar procedimentos:', err);
                    return res.status(500).send('Erro ao carregar procedimentos.');
                }

                if (!procedures || procedures.length === 0) {
                    return res.status(500).send('Nenhum procedimento encontrado.');
                }

                if (!clients || clients.length === 0) {
                    return res.status(500).send('Nenhum cliente encontrado.');
                }

                res.render('agenda/create', { clients, procedures });
            });
        } catch (err) {
            console.error('Erro ao carregar clientes ou procedimentos:', err);
            res.status(500).send('Erro ao carregar clientes ou procedimentos.');
        }
    },

    // Criar uma nova agenda
    create: (req, res) => {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        // Validação simples para garantir que todos os campos sejam preenchidos
        if (!clientes || !procedimentos || !profissional || !forma_pag || !data || !hora) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const createAgenda = { clientes, procedimentos, profissional, forma_pag, data, hora };

        Agenda.create(createAgenda, (err, result) => {
            if (err) {
                console.error('Erro ao criar agenda:', err);
                return res.status(500).send('Erro ao criar agenda.');
            }

            res.redirect('/agenda');
        });
    },

    // Atualizar uma agenda
    update: (req, res) => {
        const cod = req.params.cod;
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        if (!clientes || !procedimentos || !profissional || !forma_pag || !data || !hora) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const updatedAgenda = { clientes, procedimentos, profissional, forma_pag, data, hora };

        Agenda.update(cod, updatedAgenda, (err) => {
            if (err) {
                console.error('Erro ao atualizar agenda:', err);
                return res.status(500).send('Erro ao atualizar agenda.');
            }

            res.redirect('/agenda');
        });
    },

    // Deletar uma agenda
    delete: (req, res) => {
        const cod = req.params.cod;

        Agenda.delete(cod, (err) => {
            if (err) {
                console.error('Erro ao deletar agenda:', err);
                return res.status(500).send('Erro ao deletar agenda.');
            }

            res.redirect('/agenda');
        });
    }
};

module.exports = agendaController;
