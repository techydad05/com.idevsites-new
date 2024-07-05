// @ts-nocheck
import { query } from "./db.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createSession = async (userId) => {
  const result = await query(
    "INSERT INTO sessions (user_id) VALUES ($1) RETURNING id",
    [userId]
  );
  return result.rows[0].id;
};

export const getAllSessions = async (userId) => {
  const result = await query(
    "SELECT * FROM sessions WHERE user_id = $1 ORDER BY id DESC",
    [userId]
  );
  return result.rows;
};

export const getMostRecentSession = async (userId) => {
  const result = await query(
    "SELECT * FROM sessions WHERE user_id = $1 ORDER BY id DESC LIMIT 1",
    [userId]
  );
  return result.rows[0];
};

export const saveMessage = async (sessionId, userPrompt, botResponse) => {
  await query(
    "INSERT INTO messages (session_id, user_prompt, bot_response) VALUES ($1, $2, $3)",
    [sessionId, userPrompt, botResponse]
  );
};

export const getAllSessionsWithMessages = async (userId) => {
  const result = await query(
    `
      SELECT DISTINCT s.id, s.user_id
      FROM sessions s
      JOIN messages m ON s.id = m.session_id
      WHERE s.user_id = $1
    `,
    [userId]
  );

  return result.rows;
};

export const getSessionMessages = async (sessionId) => {
  const result = await query(
    "SELECT user_prompt, bot_response FROM messages WHERE session_id = $1",
    [sessionId]
  );
  return result.rows;
};

export const generateSessionTitle = async (chatHistory) => {
  let chatArr = [];
  chatHistory.forEach((c) => {
    chatArr.push({ role: "user", content: c.user_prompt });
    // chatArr.push({ role: "assistant", content: c.bot_response });
  });
  chatArr.push({
    role: "user",
    content: `Generate a concise title for the following chat history.`,
  });
//   console.log("chatArr:", chatArr);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: chatArr,
    max_tokens: 500,
  });
  return response.choices[0].message;
};

export const deleteSession = async (sessionId) => {
    try {
      // Begin transaction
      await query('BEGIN');
  
      // Delete messages associated with the session
      await query('DELETE FROM messages WHERE session_id = $1', [sessionId]);
  
      // Delete the session
      await query('DELETE FROM sessions WHERE id = $1', [sessionId]);
  
      // Commit transaction
      await query('COMMIT');
  
      return { success: true };
    } catch (error) {
      // Rollback transaction in case of error
      await query('ROLLBACK');
      console.error('Error deleting session:', error);
      return { success: false, error: error.message };
    }
  }
