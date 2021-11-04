const BaseError = class extends Error {
  constructor (options = {}) {
    super();
    this.name = options.name || 'Error';
    this.status = options.status || 500;
    this.message = options.message || 'Internal server error';
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
  };
};

export default BaseError;
