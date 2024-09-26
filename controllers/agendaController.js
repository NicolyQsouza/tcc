const Agenda = require('../models/Agenda');

exports.getAllAgendas = async (req, res) => {
    const agendas = await Agenda.getAll();
    res.render('agenda/index', { agendas });
};

exports.renderCreateForm = (req, res) => {
    res.render('agenda/create');
};

exports.createAgenda = async (req, res) => {
    const agenda = req.body;
    await Agenda.create(agenda);
    res.redirect('/agenda');
};

exports.getAgendaById = async (req, res) => {
    const agenda = await Agenda.getById(req.params.id);
    res.render('agenda/show', { agenda });
};

exports.renderEditForm = async (req, res) => {
    const agenda = await Agenda.getById(req.params.id);
    res.render('agenda/edit', { agenda });
};

exports.updateAgenda = async (req, res) => {
    await Agenda.update(req.params.id, req.body);
    res.redirect('/agenda');
};

exports.deleteAgenda = async (req, res) => {
    await Agenda.delete(req.params.id);
    res.redirect('/agenda');
};
