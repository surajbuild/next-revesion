import { Elysia } from "elysia";
import { z } from "zod";

const app = new Elysia()
  //   .post("/api/v1/signup", ({ body }) => {
  //     console.log(body);
  //     // return "hi there"
  //   })
  .get('/id/:id', ({ params: { id }, query: { name } }) => id, {
    params: z.object({
        id: z.coerce.number()
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
