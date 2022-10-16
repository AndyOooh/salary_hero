export const errorCreator = async (message, statusCode) => {
  console.log('in errC');
  return function (req, res, next) {
    console.log('req', req);
    console.log('in errC req', message);
    return 2;
    // next();
  };
};
