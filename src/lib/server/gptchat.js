// server/gptchat.js

import { query } from './db.js';


export const createSession = async (userId) => {
    const result = await query(
        'INSERT INTO sessions (user_id) VALUES ($1) RETURNING id',
        [userId]
    );
    return result.rows[0].id;
};

export const getAllSessions = async (userId) => {
    const result = await query(
        'SELECT * FROM sessions WHERE user_id = $1 ORDER BY id DESC',
        [userId]
    );
    return result.rows;
};

export const getMostRecentSession = async (userId) => {
    const result = await query(
        'SELECT * FROM sessions WHERE user_id = $1 ORDER BY id DESC LIMIT 1',
        [userId]
    );
    return result.rows[0];
};

export const saveMessage = async (sessionId, userPrompt, botResponse) => {
    await query(
        'INSERT INTO messages (session_id, user_prompt, bot_response) VALUES ($1, $2, $3)',
        [sessionId, userPrompt, botResponse]
    );
};

export const getSessionMessages = async (sessionId) => {
    const result = await query(
        'SELECT user_prompt, bot_response FROM messages WHERE session_id = $1',
        [sessionId]
    );
    return result.rows;
};
