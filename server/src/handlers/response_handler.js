const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

const err = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something went wrong",
  });
const badRequest = (res) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });
const ok = (res) => (res, 200, data);
const created = (res) =>
  responseWithData(res, 201, {
    status: 201,
    message: "Unauthorized",
  });
const unauthorized = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized",
  });
const notfound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource Not Found",
  });

export default {
  err,
  badRequest,
  ok,
  created,
  unauthorized,
  notfound,
};
