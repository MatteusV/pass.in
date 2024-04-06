import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  ZodError
} from "./chunk-AF5DONCV.mjs";

// src/error-handler.ts
var errorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "Internal server error!" });
};

export {
  errorHandler
};
