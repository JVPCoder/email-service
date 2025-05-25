import Email from '../models/Email.js';
import Draft from '../models/Draft.js';

export async function sendEmail(req, res) {
  const { assunto, emailDestinatario, corpo } = req.body;

  if (!assunto || !emailDestinatario || !corpo) {
    return res.status(400).json({
      mensagem: "Erro na requisição",
      erro: "Campos obrigatórios faltando"
    });
  }

  try {
    const email = new Email({
      userId: req.user.id,
      assunto,
      emailRemetente: req.user.email,
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
    console.error('Erro ao enviar email:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}

export async function sendEmailFromDraft(req, res) {
  try {
    const draft = await Draft.findOne({ _id: req.params.id, userId: req.user.id });

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
      userId: req.user.id,
      assunto: draft.assunto,
      emailRemetente: req.user.email,
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
    console.error('Erro ao enviar email do rascunho:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}

export async function markAsRead(req, res) {
  try {
    const email = await Email.findOne({ _id: req.params.id, userId: req.user.id });

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
    console.error('Erro ao marcar email como lido:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}

export async function getAllEmails(req, res) {
  try {
    const emails = await Email.find({ userId: req.user.id });

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
    console.error('Erro ao buscar emails:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}
