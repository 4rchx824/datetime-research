import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const dateRouter = createTRPCRouter({
  getAllDates: publicProcedure.query(({ ctx }) => {
    console.log(ctx.db.deadline.findMany().then((res) => console.log(res)));
    return ctx.db.deadline.findMany();
  }),
});
