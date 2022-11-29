import query from "../config/db.conf.js";

export async function saveThread(thread) {
  try {
    const [firstThread] = await query(
      "SELECT * FROM saved WHERE saved.user_id = ? AND saved.id = ?",
      [thread.user_id, thread.id]
    );
    if (firstThread) return { error: "Already saved", success: false };

    const { insertId } = await query("INSERT INTO saved SET ? ", thread);

    return { data: { insertId, ...thread }, success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong 🤷", success: false };
  }
}

export async function removeSaved(user_id, thread_id) {
  try {
    await query("DELETE FROM saved WHERE user_id = ? AND thread_id = ?", [
      user_id,
      thread_id,
    ]);
    return { data: thread_id, success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong 🤷", success: false };
  }
}

export async function getByUser(user_id) {
  try {
    const savedThreads = await query(
      "SELECT id, title, author, flair, time, body,  score, bodyHtml, subreddit, header, replyNumber, repliesArray, progress FROM saved WHERE thread.user_id = ?",
      [user_id]
    );
    return { data: saved, success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong 🤷", success: false };
  }
}
