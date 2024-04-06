import { BadRequest } from './chunk-JRO4E4TH.mjs'
import { z } from './chunk-AF5DONCV.mjs'
import { prisma } from './chunk-YVGXYLIE.mjs'

// src/routes/get-attendee-badge.ts
async function getAttendeeBadge(app) {
  app.withTypeProvider().get(
    '/attendees/:attendeesId/badge',
    {
      schema: {
        summary: 'Get an  attendee badge',
        tags: ['attendees'],
        params: z.object({
          attendeesId: z.string().transform(Number),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeesId } = request.params
      const attendee = await prisma.attendee.findUnique({
        where: {
          id: attendeesId,
        },
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
      })
      if (attendee === null) {
        throw new BadRequest('Attendee not found.')
      }
      const baseURL = `${request.protocol}://${request.hostname}`
      const checkInURL = new URL(`/attendees/${attendeesId}/check-in`, baseURL)
      return reply.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInURL: checkInURL.toString(),
        },
      })
    },
  )
}

export { getAttendeeBadge }
