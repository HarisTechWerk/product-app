import { http, HttpResponse } from "msw";

export const handlers = [
  http.patch("/api/users/:id", async ({ request, params }) => {
    const body = await request.json() as Record<string, any>; // Type as an object
    console.log(" PATCH /api/users/:id payload:", body);
    return HttpResponse.json({
      id: params.id,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),
];