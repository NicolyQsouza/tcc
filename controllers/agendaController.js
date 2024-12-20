const Agenda = require('../models/agendaModel');
const Clientes = require('../models/clientesModel');

const agendaController = {
    // Obter todas as agendas
    getAll: async (req, res) => {
        try {
            // Buscar todas as agendas
            const agendas = await new Promise((resolve, reject) => {
                Agenda.getAll((err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            // Processar as agendas para incluir os dados dos clientes e procedimentos
            const agendaComDetalhes = await Promise.all(agendas.map(async (agenda) => {
                try {
                    // Buscar dados do cliente
                    const clienteData = await new Promise((resolve, reject) => {
                        Clientes.getById(agenda.clientes, (err, data) => {
                            if (err) return reject(err);
                            resolve(data);
                        });
                    });

                    // Buscar dados do procedimento
                    const procedimentoData = await new Promise((resolve, reject) => {
                        Agenda.getProcedureById(agenda.procedimentos, (err, data) => {
                            if (err) return reject(err);
                            resolve(data);
                        });
                    });

                    // Retornar a agenda com os detalhes adicionais
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

            // Passar as agendas processadas para a view
            res.render('agenda/index', { agendas: agendaComDetalhes });

        } catch (err) {
            console.error('Erro ao buscar agendas:', err);
            res.status(500).send('Erro ao buscar agendas.');
        }
    },

    // Renderizar o formulário de criação de agenda
    renderCreateForm: (req, res) => {
        // Buscar todos os clientes
        Clientes.getAll((err, clients) => {
            if (err) {
                console.error('Erro ao carregar clientes:', err);
                return res.status(500).send('Erro ao carregar clientes.');
            }

            // Buscar todos os procedimentos
            Agenda.getProcedures((err, procedures) => {
                if (err) {
                    console.error('Erro ao carregar procedimentos:', err);
                    return res.status(500).send('Erro ao carregar procedimentos.');
                }

                res.render('agenda/create', { clients, procedures });
            });
        });
    },

    // Criar uma nova agenda
    create: (req, res) => {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        // Validação simples para garantir que todos os campos sejam preenchidos
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

    // Obter uma agenda por código (cod)
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
                Agenda.getProcedureById(agenda.procedimentos, (err, procedimentoData) => {
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

            // Buscar todos os clientes
            Clientes.getAll((err, clients) => {
                if (err) {
                    console.error('Erro ao carregar clientes:', err);
                    return res.status(500).send('Erro ao carregar clientes.');
                }

                // Buscar todos os procedimentos
                Agenda.getProcedures((err, procedures) => {
                    if (err) {
                        console.error('Erro ao carregar procedimentos:', err);
                        return res.status(500).send('Erro ao carregar procedimentos.');
                    }

                    res.render('agenda/edit', { agenda, clients, procedures });
                });
            });
        });
    },

    // Atualizar uma agenda
    update: (req, res) => {
        const cod = req.params.cod;
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;

        // Validação para garantir que todos os campos sejam preenchidos
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
