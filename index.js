import sharedConfig from './sharedConfig';
import handleError from './router/handleError';
import routerPromise from './router/promisifyRouter';
import BaseError from './errors/BaseError';

const all = { sharedConfig, handleError, routerPromise, BaseError };

export { sharedConfig, handleError, routerPromise, BaseError };

export default all;
