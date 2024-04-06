import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  z
} from "./chunk-AF5DONCV.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/check-in.ts
async function checkIn(app) {
  app.withTypeProvider().get(
    "/attendee/:attendeeId/check-in",
    {
      schema: {
        summary: "Check in an attendee",
        tags: ["check-ins"],
        params: z.object({
          attendeeId: z.coerce.number().int()
        }),
        response: {
          201: z.null()
        }
      }
    },
    async (request, reply) => {
      const { attendeeId } = request.params;
      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId
        }
      });
      if (attendeeCheckIn !== null) {
        throw new BadRequest("Attendee already checked in!");
      }
      await prisma.checkIn.create({
        data: {
          attendeeId
        }
      });
      return reply.status(201);
    }
  );
}

export {
  checkIn
};
