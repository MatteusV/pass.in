import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  z
} from "./chunk-AF5DONCV.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/register-for-event.ts
async function registerForEvent(app) {
  app.withTypeProvider().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Register an attendee",
        tags: ["attendees"],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email()
        }),
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          201: z.object({
            attendeeId: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, name } = request.body;
      const { eventId } = request.params;
      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            eventId,
            email
          }
        }
      });
      if (attendeeFromEmail !== null) {
        throw new BadRequest("This e-mail is already registered for this event");
      }
      const [event, amountOfAttendeesForEvent] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId
          }
        }),
        prisma.attendee.count({
          where: {
            eventId
          }
        })
      ]);
      if (event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
        throw new BadRequest(
          "The maximum number of attendees for this event has been reached"
        );
      }
      const { id } = await prisma.attendee.create({
        data: {
          email,
          name,
          eventId
        }
      });
      return reply.status(201).send({ attendeeId: id });
    }
  );
}

export {
  registerForEvent
};