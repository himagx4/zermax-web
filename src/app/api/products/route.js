import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let products;
    if (category) {
      products =
        await sql`SELECT * FROM products WHERE category = ${category} ORDER BY created_at DESC`;
    } else {
      products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    }

    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
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
      INSERT INTO products (name, description, technical_specs, price, category, image_url, stock_quantity)
      VALUES (${name}, ${description}, ${technical_specs}, ${price}, ${category}, ${image_url}, ${stock_quantity})
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
