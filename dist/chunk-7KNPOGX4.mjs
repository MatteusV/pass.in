import {
  z
} from "./chunk-AF5DONCV.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/get-events-attendees.ts
async function getEventAttendees(app) {
  app.withTypeProvider().get(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Get event attendees",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid()
        }),
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullable().default("0").transform(Number)
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                checkInAt: z.date().nullable()
              })
            )
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { pageIndex, query } = request.query;
      const attendees = await prisma.attendee.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          checkIn: {
            select: {
              createdAt: true
            }
          }
        },
        where: query ? {
          name: {
            contains: query
          },
          eventId
        } : { eventId },
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          createdAt: "desc"
        }
      });
      return reply.send({
        attendees: attendees.map((attendee) => {
          return {
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt,
            checkInAt: attendee.checkIn?.createdAt ?? null
          };
        })
      });
    }
  );
}

export {
  getEventAttendees
};
