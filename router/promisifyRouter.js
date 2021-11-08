import methods from 'methods';
import handleResponse from './handleResponse';

const promisify = (fn) => {
  return function wrapper(req, res, next) {
    const promise = fn.apply(this, arguments);

    if (typeof promise === 'object' && typeof promise.then === 'function') {
      promise
        .then(handleResponse.bind(null, req, res))
        .catch(next);
    }
  };
};

const routerPromise = (router) => {
  methods.concat('del').forEach(function (method) {
    const originalFunction = router[method];
    router[method] = function (path) {
      const middleware = Array.prototype.slice.call(arguments, 1).map(promisify);

      return originalFunction.apply(router, [path].concat(middleware));
    };
  });

  return router;
};

export default routerPromise;
