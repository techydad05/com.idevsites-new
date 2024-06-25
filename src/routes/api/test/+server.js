import { query } from '$lib/db';

export async function POST({ request }) {
  const { name, value } = await request.json();

  try {
    const res = await query(
      'INSERT INTO test_table (name, value) VALUES ($1, $2) RETURNING *',
      [name, value]
    );
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
