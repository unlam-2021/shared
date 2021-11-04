import _ from 'lodash';
import * as http from 'http';

import BaseError from '../errors/BaseError';

const handleError = (err, req, res, next) => {
  if (!/^\d+$/.test(err.status)) {
    console.log('Unhandled error: ', err.stack);
    err = new BaseError(err);
  }

  const message = err.humanMessage || err.message || http.STATUS_CODES[err.status];

  res.status(err.status).json(_.assign(_.pick(err, ['name', 'title', 'headers', 'upstream']), {message}));
};

export default handleError;
