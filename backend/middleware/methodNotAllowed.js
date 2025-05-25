export default (allowedMethods) => {
    return (req, res, next) => {
      if (!allowedMethods.includes(req.method)) {
        return res.status(405).json({ mensagem: 'endpoint não possui o metodo.' });
      }
      next();
    };
  };
  