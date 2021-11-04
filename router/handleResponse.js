const RESPONSE_CODES = {
  POST:   201,
  DELETE: 204
};

const handleResponse = (req, res, data) => {
  if (res.headersSent) {
    return;
  }

  const statusCode = RESPONSE_CODES[req.method] || 200;

  res.status(statusCode).json(data);
};

export default handleResponse;
