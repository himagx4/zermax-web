import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;

    if (product.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      name,
      description,
      technical_specs,
      price,
      category,
      image_url,
      stock_quantity,
    } = body;

    const result = await sql`
      UPDATE products
      SET name = ${name}, 
          description = ${description}, 
          technical_specs = ${technical_specs}, 
          price = ${price}, 
          category = ${category}, 
          image_url = ${image_url}, 
          stock_quantity = ${stock_quantity}
      WHERE id = ${id}
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await sql`DELETE FROM products WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
