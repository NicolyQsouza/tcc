const Agenda = require('../models/agendaModel');
const Clientes = require('../models/clientesModel');
const Procedimentos = require('../models/procedimentosModel'); // Se tiver um model para procedimentos

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

    // Renderizar o formulário de criação de agenda
    renderCreateForm: async (req, res) => {
        try {
            const clients = await Clientes.getAll();
            const procedures = await Procedimentos.getAll();
            res.render('agenda/create', { clients, procedures });
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

        const newAgenda = { clientes, procedimentos, profissional, forma_pag, data, hora };

        // Vamos garantir que o método create esteja funcionando corretamente
        Agenda.create(newAgenda, (err, result) => {
            if (err) {
                console.error('Erro ao criar agenda:', err);
                return res.status(500).send('Erro ao criar agenda.');
            }

            // Verifique se o result tem os dados da agenda criada
            if (!result) {
                return res.status(400).send('Erro ao criar agenda.');
            }

            // Redireciona para a lista de agendas após criação
            res.redirect('/agenda');
        });
    },

    // Obter uma agenda por código
    getById: (req, res) => {
        const cod = req.params.cod;

        Agenda.getById(cod, (err, agenda) => {
            if (err) {
                console.error('Erro ao buscar agenda por cod:', err);
                return res.status(500).send('Erro ao buscar agenda.');
            }

            if (!agenda) {
                return res.status(404).send('Agenda não encontrada.');
            }

            // Buscar o nome do cliente
            Clientes.getById(agenda.clientes, (err, clienteData) => {
                const clienteNome = clienteData ? clienteData.nome : 'Cliente não encontrado';

                // Buscar o nome do procedimento
                Procedimentos.getById(agenda.procedimentos, (err, procedimentoData) => {
                    const procedimentoNome = procedimentoData ? procedimentoData.nome : 'Procedimento não encontrado';

                    // Adicionando os nomes ao objeto de agenda
                    agenda.clientesNome = clienteNome;
                    agenda.procedimentosNome = procedimentoNome;

                    res.render('agenda/show', { agenda });
                });
            });
        });
    },

    // Renderizar o formulário de edição da agenda
    renderEditForm: (req, res) => {
        const cod = req.params.cod;

        Agenda.getById(cod, (err, agenda) => {
            if (err) {
                console.error('Erro ao buscar agenda para edição:', err);
                return res.status(500).send('Erro ao carregar formulário de edição.');
            }

            if (!agenda) {
                return res.status(404).send('Agenda não encontrada.');
            }

            // Buscar todos os clientes e procedimentos
            Promise.all([
                Clientes.getAll(),
                Procedimentos.getAll()
            ]).then(([clients, procedures]) => {
                res.render('agenda/edit', { agenda, clients, procedures });
            }).catch(err => {
                console.error('Erro ao carregar clientes ou procedimentos:', err);
                res.status(500).send('Erro ao carregar clientes ou procedimentos.');
            });
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

        Agenda.update(cod, updatedAgenda, (err, updated) => {
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
        const cod = req.params.cod;

        Agenda.delete(cod, (err, deleted) => {
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
