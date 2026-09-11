import type { RequestHandler } from "express";

import logger from "../lib/logger.js";

export const httpBeforeLogger: RequestHandler = (req, _res, next) => {
  logger.info(
    {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get("user-agent"),
    },
    "Incoming request",
  );

  next();
};
