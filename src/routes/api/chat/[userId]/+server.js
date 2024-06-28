import { json } from '@sveltejs/kit';
import { query } from '$lib/db';

export async function GET({ params }) {
  const { userId } = params;
  console.log("params:", params);

  try {
    const res = await query(
      'SELECT user_message, bot_response FROM chat_history WHERE user_id = $1 ORDER BY timestamp ASC',
      [userId]
    );

    return json(res.rows);
  } catch (err) {
    // @ts-ignore
    return json({ error: err.message }, { status: 500 });
  }
}
