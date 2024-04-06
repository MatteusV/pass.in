import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import cors from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-event'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { checkIn } from './routes/check-in'
import { getEventAttendees } from './routes/get-events-attendees'
import { errorHandler } from './error-handler'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(swagger, {
  swagger: {
    consumes: ['aplication/json'],
    produces: ['aplication/json'],
    info: {
      title: 'pass.in',
      description:
        'Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(swaggerUi, {
  routePrefix: '/docs',
})
app.register(cors, {
  origin: '*',
})

// routes
app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('HTTP server running!'))
