import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.string(),
        time: z.string(),
      }),
    )
    .mutation(({ input }) => {
      console.log(input);
      return {
        hello: "LOL",
      };
    }),
});
