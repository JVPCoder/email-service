const Email = require('../models/Email');
const Draft = require('../models/Draft');

exports.sendEmail = async (req, res) => {
  const { assunto, emailDestinatario, corpo } = req.body;

  if (!assunto || !emailDestinatario || !corpo) {
    return res.status(400).json({
      mensagem: "Erro na requisição",
      erro: "Campos obrigatórios faltando"
    });
  }

  try {
    const email = new Email({
      userId: req.userId,
      assunto,
      emailRemetente: req.userId,
      emailDestinatario,
      corpo
    });

    await email.save();

    res.status(200).json({
      mensagem: "Email enviado com sucesso",
      email: {
        emailId: email._id,
        assunto: email.assunto,
        emailRemetente: email.emailRemetente,
        emailDestinatario: email.emailDestinatario,
        corpo: email.corpo,
        status: email.status,
        dataEnvio: email.dataEnvio.toISOString().slice(0,10).split('-').reverse().join('-')
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
};

exports.sendEmailFromDraft = async (req, res) => {
  try {
    const draft = await Draft.findOne({ _id: req.params.id, userId: req.userId });

    if (!draft) {
      return res.status(404).json({ mensagem: "Rascunho não encontrado" });
    }

    if (!draft.assunto || !draft.emailDestinatario || !draft.corpo) {
      return res.status(400).json({
        mensagem: "Erro na requisição",
        erro: "Rascunho incompleto"
      });
    }

    const email = new Email({
      userId: req.userId,
      assunto: draft.assunto,
      emailRemetente: req.userId,
      emailDestinatario: draft.emailDestinatario,
      corpo: draft.corpo
    });

    await email.save();

    res.status(200).json({
      mensagem: "Email enviado com sucesso",
      email: {
        emailId: email._id,
        assunto: email.assunto,
        emailRemetente: email.emailRemetente,
        emailDestinatario: email.emailDestinatario,
        corpo: email.corpo,
        status: email.status,
        dataEnvio: email.dataEnvio.toISOString().slice(0,10).split('-').reverse().join('-')
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const email = await Email.findOne({ _id: req.params.id, userId: req.userId });

    if (!email) {
      return res.status(404).json({ mensagem: "Email não encontrado" });
    }

    email.status = "lido";
    await email.save();

    res.status(200).json({
      mensagem: "Email marcado como lido",
      email: {
        emailId: email._id,
        assunto: email.assunto,
        emailRemetente: email.emailRemetente,
        emailDestinatario: email.emailDestinatario,
        corpo: email.corpo,
        status: email.status,
        dataEnvio: email.dataEnvio.toISOString().slice(0,10).split('-').reverse().join('-')
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
};

exports.getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find({ userId: req.userId });

    if (!emails.length) {
      return res.status(404).json({ mensagem: "Email não encontrado" });
    }

    res.status(200).json({
      mensagem: "Email encontrado",
      emails: emails.map(e => ({
        emailId: e._id,
        assunto: e.assunto,
        emailRemetente: e.emailRemetente,
        emailDestinatario: e.emailDestinatario,
        corpo: e.corpo,
        status: e.status,
        dataEnvio: e.dataEnvio.toISOString().slice(0,10).split('-').reverse().join('-')
      }))
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
};
