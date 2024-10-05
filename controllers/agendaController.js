const Agenda = require('../models/Agenda');

exports.getAllAgendas = async (req, res) => {
    const agendas = await Agenda.getAll();
    res.render('agenda/index', { agendas });
};

exports.renderCreateForm = async (req, res) => {
    // Assuming you have a method to fetch clients and procedures for the form
    const clients = await Agenda.getClients();
    const procedures = await Agenda.getProcedures();
    res.render('agenda/create', { clients, procedures });
};

exports.createAgenda = async (req, res) => {
    const { cliente, procedimento, profissional, forma_pag, data, hora } = req.body;
    const agenda = { cliente, procedimento, profissional, forma_pag, data, hora };
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
    const { cliente, procedimento, profissional, forma_pag, data, hora } = req.body;
    const agendaData = { cliente, procedimento, profissional, forma_pag, data, hora };
    await Agenda.update(req.params.id, agendaData);
    res.redirect('/agenda');
};

exports.deleteAgenda = async (req, res) => {
    await Agenda.delete(req.params.id);
    res.redirect('/agenda');
};
