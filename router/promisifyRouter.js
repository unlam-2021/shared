import methods from 'methods';
import handleResponse from './handleResponse';

const promisify = (fn) => {
  return function wrapper(req, res, next) {
    var promise = fn.apply(this, arguments);

    if (typeof promise === 'object' && typeof promise.then === 'function') {
      promise
        .then(handleResponse.bind(null, req, res))
        .catch(next);
    }
  };
};

const routerPromise = (router) => {
  /**
   * Monkey patch Express application with promise support.
   */
  methods.concat('del').forEach(function (method) {
    var originalFunction = router[method];
    router[method] = function (path) {
      // Promisify every function passed into the method.
      var middleware = Array.prototype.slice.call(arguments, 1).map(promisify);

      // Call the original Express method with the patched functions.
      return originalFunction.apply(router, [path].concat(middleware));
    };
  });

  return router;
};

export default routerPromise;
