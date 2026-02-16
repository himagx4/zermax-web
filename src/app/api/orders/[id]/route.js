import sql from "@/app/api/utils/sql";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const result = await sql`
      UPDATE orders
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update order status" },
      { status: 500 },
    );
  }
}
