const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do transporte de e-mail (configuração do seu e-mail)
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou o serviço de sua escolha
  auth: {
    user: 'gabiraupp@gmail.com', // seu e-mail
    pass: '01102005Br@' // sua senha (recomendo usar uma senha de app do Gmail)
  }
});

// Rota para enviar o e-mail
app.post('/enviar-email', (req, res) => {
  const { nome, telefone, mensagem } = req.body;

  // Configuração do e-mail
  const mailOptions = {
    from: 'gabiraupp@gmail.com',
    to: 'gabiraupp@gmail.com',
    subject: `Novo contato de ${nome}`,
    text: `Você recebeu uma nova mensagem:\n\nNome: ${nome}\nTelefone: ${telefone}\nMensagem: ${mensagem}`
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Erro ao enviar e-mail');
    }
    res.status(200).send('E-mail enviado com sucesso');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
