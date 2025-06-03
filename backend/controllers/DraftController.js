import db from '../db.js'; // Conexão Knex

// CRIAR RASCUNHO
export async function createDraft(req, res) {
  const { assunto, emailDestinatario, corpo } = req.body;

  if (!assunto && !emailDestinatario && !corpo) {
    return res.status(400).json({
      mensagem: 'Erro ao cadastrar usuario',
      erro: 'Pelo menos um campo deve ser preenchido'
    });
  }

  try {
    const [novoRascunho] = await db('drafts')
      .insert({
        user_id: req.user.id,
        assunto,
        email_destinatario: emailDestinatario,
        corpo
      })
      .returning(['id', 'assunto', 'email_destinatario', 'corpo']);

    res.status(200).json({
      mensagem: 'Rascunho criado',
      rascunho: {
        draftId: novoRascunho.id,
        assunto: novoRascunho.assunto,
        emailDestinatario: novoRascunho.email_destinatario,
        corpo: novoRascunho.corpo
      }
    });
  } catch (err) {
    console.error('Erro ao criar rascunho:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// ATUALIZAR RASCUNHO
export async function updateDraft(req, res) {
  const { rascunhoId, assunto, emailDestinatario, corpo } = req.body;

  if (!rascunhoId) {
    return res.status(400).json({
      mensagem: 'Erro ao cadastrar usuario',
      erro: 'rascunhoId é obrigatório'
    });
  }

  if (!assunto && !emailDestinatario && !corpo) {
    return res.status(400).json({
      mensagem: 'Erro ao cadastrar usuario',
      erro: 'Pelo menos um campo deve ser preenchido'
    });
  }

  try {
    const draft = await db('drafts')
      .where({ id: rascunhoId, user_id: req.user.id })
      .first();

    if (!draft) {
      return res.status(404).json({ mensagem: 'Rascunho não encontrado' });
    }

    await db('drafts')
      .where({ id: rascunhoId, user_id: req.user.id })
      .update({
        assunto: assunto || draft.assunto,
        email_destinatario: emailDestinatario || draft.email_destinatario,
        corpo: corpo || draft.corpo
      });

    const rascunhoAtualizado = await db('drafts')
      .where({ id: rascunhoId, user_id: req.user.id })
      .first();

    res.status(200).json({
      mensagem: 'Rascunho salvo com sucesso',
      rascunho: {
        draftId: rascunhoAtualizado.id,
        assunto: rascunhoAtualizado.assunto,
        emailDestinatario: rascunhoAtualizado.email_destinatario,
        corpo: rascunhoAtualizado.corpo
      }
    });
  } catch (err) {
    console.error('Erro ao atualizar rascunho:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// OBTER RASCUNHO POR ID
export async function getDraft(req, res) {
  try {
    const draft = await db('drafts')
      .where({ id: req.params.id, user_id: req.user.id })
      .first();

    if (!draft) {
      return res.status(404).json({ mensagem: 'Rascunho não encontrado' });
    }

    res.status(200).json({
      mensagem: 'Rascunho localizado',
      rascunho: {
        draftId: draft.id,
        assunto: draft.assunto,
        emailDestinatario: draft.email_destinatario,
        corpo: draft.corpo
      }
    });
  } catch (err) {
    console.error('Erro ao buscar rascunho:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// OBTER TODOS OS RASCUNHOS DO USUÁRIO
export async function getAllDrafts(req, res) {
  try {
    const drafts = await db('drafts')
      .where({ user_id: req.user.id })
      .select('id', 'assunto', 'email_destinatario', 'corpo');

    res.status(200).json({
      mensagem: 'Rascunhos localizados',
      rascunhos: drafts.map(d => ({
        draftId: d.id,
        assunto: d.assunto,
        emailDestinatario: d.email_destinatario,
        corpo: d.corpo
      }))
    });
  } catch (err) {
    console.error('Erro ao buscar rascunhos:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// DELETAR RASCUNHO
export async function deleteDraft(req, res) {
  try {
    const draft = await db('drafts')
      .where({ id: req.params.id, user_id: req.user.id })
      .first();

    if (!draft) {
      return res.status(404).json({ mensagem: 'Rascunho não encontrado' });
    }

    await db('drafts')
      .where({ id: req.params.id, user_id: req.user.id })
      .del();

    res.status(200).json({ mensagem: 'Rascunho deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar rascunho:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}
