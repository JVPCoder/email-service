import db from '../db.js';

// ENVIAR EMAIL
export async function sendEmail(req, res) {
  const { assunto, emailDestinatario, corpo } = req.body;

  if (!assunto || !emailDestinatario || !corpo) {
    return res.status(400).json({
      mensagem: "Erro na requisição",
      erro: "Campos obrigatórios faltando"
    });
  }

  try {
    const [novoEmail] = await db('emails')
      .insert({
        user_id: req.user.id,
        assunto,
        email_remetente: req.user.email,
        email_destinatario: emailDestinatario,
        corpo
      })
      .returning(['id', 'assunto', 'email_remetente', 'email_destinatario', 'corpo', 'status', 'data_envio']);

    res.status(200).json({
      mensagem: "Email enviado com sucesso",
      email: {
        emailId: novoEmail.id,
        assunto: novoEmail.assunto,
        emailRemetente: novoEmail.email_remetente,
        emailDestinatario: novoEmail.email_destinatario,
        corpo: novoEmail.corpo,
        status: novoEmail.status,
        dataEnvio: novoEmail.data_envio.toISOString().slice(0,10).split('-').reverse().join('-')
      }
    });
  } catch (err) {
    console.error('Erro ao enviar email:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}

// ENVIAR EMAIL A PARTIR DE RASCUNHO
export async function sendEmailFromDraft(req, res) {
  try {
    const draft = await db('drafts')
      .where({ id: req.params.id, user_id: req.user.id })
      .first();

    if (!draft) {
      return res.status(404).json({ mensagem: "Rascunho não encontrado" });
    }

    if (!draft.assunto || !draft.email_destinatario || !draft.corpo) {
      return res.status(400).json({
        mensagem: "Erro na requisição",
        erro: "Rascunho incompleto"
      });
    }

    const [novoEmail] = await db('emails')
      .insert({
        user_id: req.user.id,
        assunto: draft.assunto,
        email_remetente: req.user.email,
        email_destinatario: draft.email_destinatario,
        corpo: draft.corpo
      })
      .returning(['id', 'assunto', 'email_remetente', 'email_destinatario', 'corpo', 'status', 'data_envio']);

    res.status(200).json({
      mensagem: "Email enviado com sucesso",
      email: {
        emailId: novoEmail.id,
        assunto: novoEmail.assunto,
        emailRemetente: novoEmail.email_remetente,
        emailDestinatario: novoEmail.email_destinatario,
        corpo: novoEmail.corpo,
        status: novoEmail.status,
        dataEnvio: novoEmail.data_envio.toISOString().slice(0,10).split('-').reverse().join('-')
      }
    });
  } catch (err) {
    console.error('Erro ao enviar email do rascunho:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}

// BUSCAR E MARCAR EMAIL COMO LIDO
export async function getEmail(req, res) {
  try {
    const email = await db('emails')
      .where({ id: req.params.id, email_destinatario: req.user.email })
      .first();

    if (!email) {
      return res.status(404).json({ mensagem: "Email não encontrado" });
    }

    // Marcar como lido se não estiver
    if (email.status !== 'lido') {
      await db('emails')
        .where({ id: req.params.id, email_destinatario: req.user.email })
        .update({ status: 'lido' });
    }

    const emailAtualizado = {
      ...email,
      status: 'lido'
    };

    res.status(200).json({
      mensagem: "Email marcado como lido",
      email: {
        emailId: emailAtualizado.id,
        assunto: emailAtualizado.assunto,
        emailRemetente: emailAtualizado.email_remetente,
        emailDestinatario: emailAtualizado.email_destinatario,
        corpo: emailAtualizado.corpo,
        status: emailAtualizado.status,
        dataEnvio: new Date(emailAtualizado.data_envio).toISOString().slice(0,10).split('-').reverse().join('-')
      }
    });
  } catch (err) {
    console.error('Erro ao buscar e marcar email como lido:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}


// OBTER TODOS OS EMAILS RECEBIDOS
export async function getAllEmails(req, res) {
  try {
    const emails = await db('emails')
      .where({ email_destinatario: req.user.email })
      .select('id', 'assunto', 'email_remetente', 'email_destinatario', 'corpo', 'status', 'data_envio');

    res.status(200).json({
      mensagem: "Emails encontrados",
      emails: emails.map(e => ({
        emailId: e.id,
        assunto: e.assunto,
        emailRemetente: e.email_remetente,
        emailDestinatario: e.email_destinatario,
        corpo: e.corpo,
        status: e.status,
        dataEnvio: e.data_envio.toISOString().slice(0,10).split('-').reverse().join('-')
      }))
    });
  } catch (err) {
    console.error('Erro ao buscar emails:', err.message);
    res.status(500).json({ mensagem: "Erro interno do servidor", erro: err.message });
  }
}
