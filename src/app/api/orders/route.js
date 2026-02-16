import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    // Only for admin panel
    const orders = await sql`
      SELECT o.*, 
      (SELECT json_agg(oi.*) FROM order_items oi WHERE oi.order_id = o.id) as items
      FROM orders o 
      ORDER BY o.created_at DESC
    `;
    return Response.json(orders);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      company_name,
      phone,
      email,
      address,
      order_note,
      total_amount,
      items,
    } = body;

    // Generate order code
    const orderCode = `ZRX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const result = await sql.transaction(async (txn) => {
      // 1. Create Order
      const [order] = await txn`
        INSERT INTO orders (order_code, customer_name, company_name, phone, email, address, order_note, total_amount)
        VALUES (${orderCode}, ${customer_name}, ${company_name}, ${phone}, ${email}, ${address}, ${order_note}, ${total_amount})
        RETURNING id, order_code
      `;

      // 2. Create Order Items and Update Stock
      for (const item of items) {
        await txn`
          INSERT INTO order_items (order_id, product_id, product_name, quantity, price_at_purchase)
          VALUES (${order.id}, ${item.id}, ${item.name}, ${item.quantity}, ${item.price})
        `;

        await txn`
          UPDATE products 
          SET stock_quantity = stock_quantity - ${item.quantity}
          WHERE id = ${item.id}
        `;
      }

      return order;
    });

    return Response.json(result);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
