// src/lib/chat.js
import { query } from '$lib/db';

export async function getSessions() {
  const result = await query('SELECT * FROM chat_sessions ORDER BY created_at DESC');
  return result.rows;
}

export async function getSession(sessionId) {
  const result = await query('SELECT * FROM chat_sessions WHERE id = $1', [sessionId]);
  return result.rows[0];
}

export async function saveMessage(sessionId, message) {
  await query('INSERT INTO chat_messages (session_id, role, content) VALUES ($1, $2, $3)', [sessionId, message.role, message.content]);
}
