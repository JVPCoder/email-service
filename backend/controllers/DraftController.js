import Draft, { findOne, find, findOneAndDelete } from '../models/Draft';

export async function createDraft(req, res) {
  const { assunto, emailDestinatario, corpo } = req.body;

  if (!assunto && !emailDestinatario && !corpo) {
    return res.status(400).json({
      mensagem: "Erro ao cadastrar usuario",
      erro: "Pelo menos um campo deve ser preenchido"
    });
  }

  try {
    const draft = new Draft({
      userId: req.userId,
      assunto,
      emailDestinatario,
      corpo
    });

    await draft.save();

    res.status(200).json({
      mensagem: "Rascunho criado",
      rascunho: {
        rascunhold: draft._id,
        assunto: draft.assunto,
        emailDestinatario: draft.emailDestinatario,
        corpo: draft.corpo
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
}

export async function updateDraft(req, res) {
  const { rascunhoId, assunto, emailDestinatario, corpo } = req.body;

  if (!rascunhoId) {
    return res.status(400).json({
      mensagem: "Erro ao cadastrar usuario",
      erro: "rascunhoId é obrigatório"
    });
  }

  if (!assunto && !emailDestinatario && !corpo) {
    return res.status(400).json({
      mensagem: "Erro ao cadastrar usuario",
      erro: "Pelo menos um campo deve ser preenchido"
    });
  }

  try {
    const draft = await findOne({ _id: rascunhoId, userId: req.userId });

    if (!draft) {
      return res.status(404).json({ mensagem: "Rascunho não encontrado" });
    }

    if (assunto) draft.assunto = assunto;
    if (emailDestinatario) draft.emailDestinatario = emailDestinatario;
    if (corpo) draft.corpo = corpo;

    await draft.save();

    res.status(200).json({
      mensagem: "Rascunho salvo com sucesso",
      rascunho: {
        rascunhold: draft._id,
        assunto: draft.assunto,
        emailDestinatario: draft.emailDestinatario,
        corpo: draft.corpo
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
}

export async function getDraft(req, res) {
  try {
    const draft = await findOne({ _id: req.params.id, userId: req.userId });

    if (!draft) {
      return res.status(404).json({ mensagem: "Rascunho não encontrado" });
    }

    res.status(200).json({
      mensagem: "Rascunho localizado",
      rascunho: {
        rascunhold: draft._id,
        assunto: draft.assunto,
        emailDestinatario: draft.emailDestinatario,
        corpo: draft.corpo
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
}

export async function getAllDrafts(req, res) {
  try {
    const drafts = await find({ userId: req.userId });

    res.status(200).json({
      mensagem: "Rascunho localizado",
      rascunhos: drafts.map(d => ({
        rascunhold: d._id,
        assunto: d.assunto,
        emailDestinatario: d.emailDestinatario,
        corpo: d.corpo
      }))
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
}

export async function deleteDraft(req, res) {
  try {
    const draft = await findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!draft) {
      return res.status(404).json({ mensagem: "Rascunho não encontrado" });
    }

    res.status(200).json({ mensagem: "Rascunho deletado com sucesso" });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      erro: err.message
    });
  }
}
