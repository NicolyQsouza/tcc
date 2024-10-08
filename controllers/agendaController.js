const Agenda = require('../models/agendaModel');

exports.getAllagenda = async (req, res) => {
    const agenda = await Agenda.getAll();
    res.render('agenda/index', { agenda });
};

exports.renderCreateForm = async (req, res) => {
    // Assuming you have a method to fetch clients and procedures for the form
    const clients = await Agenda.getClients();
    const procedures = await Agenda.getProcedures();
    res.render('agenda/create', { clients, procedures });
};

exports.createAgenda = async (req, res) => {
    const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;
    const agenda = { clientes, procedimentos, profissional, forma_pag, data, hora };
    await Agenda.create(agenda);
    res.redirect('/agenda');
};

exports.getAgendaById = async (req, res) => {
    const agenda = await Agenda.getById(req.params.id);
    res.render('agenda/show', { agenda });
};

exports.renderEditForm = async (req, res) => {
    const agenda = await Agenda.getById(req.params.id);
    const clients = await Agenda.getClients();
    const procedures = await Agenda.getProcedures();
    res.render('agenda/edit', { agenda, clients, procedures });
};

exports.updateAgenda = async (req, res) => {
    const { clientes, procedimentos, profissional, forma_pag, data, hora } = req.body;
    const agendaData = { clientes, procedimentos, profissional, forma_pag, data, hora };
    await Agenda.update(req.params.id, agendaData);
    res.redirect('/agenda');
};

exports.deleteAgenda = async (req, res) => {
    await Agenda.delete(req.params.id);
    res.redirect('/agenda');
};
