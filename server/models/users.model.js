import query from "../config/db.conf";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getByUser } from "./saved.model";

/**
 * Takes in a username and password, verifies the username doesn't exist (sending error if username is taken)
 * Hashes the password and tries to add to the table (sending an error if something went wrong)
 *
 * @param {string} username  - Username trying to log in
 * @param {string} password - Password user is trying to use
 * @returns {Promise<Object>} Success key (boolean), either an error string or data key with success message
 */
export async function register(username, password) {
  try {
    //! Grab a user with the username provided (pulling it out of the array)
    const [user] = await query("SELECT * FROM user WHERE user.username = ?", [
      username,
    ]);

    //! If there IS a user, send back an error
    if (user) return { error: "Username already in use", success: false };

    //! Hash the password
    const hash = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    //! Add the user to the database with the hashed password
    await query("INSERT INTO user (username, password, uuid) VALUES (?,?,?)", [
      username,
      hash,
      uuid,
    ]);

    //! Let user know they've successfully signed up!
    return { data: "Successfully signed up!", success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong 🤷", success: false };
  }
}

export async function login(username, password) {
  try {
    //! Grab a user with the username provided (pulling it out of the array)
    const [user] = await query("SELECT * FROM user WHERE user.username = ?", [
      username,
    ]);

    //! If there ins't a user, let them know they did something wrong
    if (!user) return { error: "Invalid Username or password", success: false };

    //! Check to see if their password is correct
    const match = await bcrypt.compare(password, user.password);
    //! If not, send back an error message
    if (!match)
      return { error: "Invalid username or Password", success: false };

    //! Get by userID and if not an error, send back object containing user info AND favorites
    const { data, error } = await getByUser(user.id);
    if (error) {
      return { error, success: false };
    }
    return {
      data: { user: { username: user.username }, saved: data, settings: data },
      success: true,
      id: user.id,
    };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong 🤷", success: false };
  }
}
