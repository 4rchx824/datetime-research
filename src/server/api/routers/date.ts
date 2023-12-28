import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const dateRouter = createTRPCRouter({
  getAllDates: publicProcedure.query(({ ctx }) => {
    return ctx.db.deadline.findMany();
  }),
});
