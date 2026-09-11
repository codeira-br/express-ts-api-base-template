import type { ErrorRequestHandler } from "express";

import { ApplicationError } from "../errors/application-error.js";
import logger from "../lib/logger.js";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ApplicationError) {
    logger.warn(
      {
        err,
        method: req.method,
        url: req.originalUrl,
      },
      err.message,
    );

    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });

    return;
  }

  logger.error(
    {
      err,
      method: req.method,
      url: req.originalUrl,
    },
    "Unhandled error",
  );

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
  });
};

export default errorHandler;
