import {
  registerForEvent
} from "./chunk-C2TJUNUS.mjs";
import {
  errorHandler
} from "./chunk-EK3NTVEE.mjs";
import {
  checkIn
} from "./chunk-SE6ADX3U.mjs";
import {
  createEvent
} from "./chunk-CAG4CP5A.mjs";
import "./chunk-M2ZTBTBQ.mjs";
import {
  getAttendeeBadge
} from "./chunk-3DS7XWA7.mjs";
import {
  getEvent
} from "./chunk-TE6ABEMM.mjs";
import "./chunk-JRO4E4TH.mjs";
import {
  getEventAttendees
} from "./chunk-7KNPOGX4.mjs";
import "./chunk-AF5DONCV.mjs";
import "./chunk-YVGXYLIE.mjs";

// src/server.ts
import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
var app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(swagger, {
  swagger: {
    consumes: ["aplication/json"],
    produces: ["aplication/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in constru\xEDda durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(swaggerUi, {
  routePrefix: "/docs"
});
app.register(cors, {
  origin: "*"
});
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(() => console.log("HTTP server running!"));
export {
  app
};
