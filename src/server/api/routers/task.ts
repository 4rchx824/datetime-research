import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import dayjs from "dayjs";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.string(),
        time: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = await ctx.db.task.create({
        data: {
          name: input.name,
          completeBy: dayjs(`${input.date} ${input.time}`).toDate(),
        },
      });

      return {
        id: id,
      };
    }),
  all: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany({
      orderBy: {
        completeBy: "asc",
      },
    });

    return tasks;
  }),
});
