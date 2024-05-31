import db from '../config/db.js';
import bcrypt from 'bcrypt';

const userSignup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const result = await db.query(
            `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, hashedPassword, role]
        );

        const newUser = result.rows[0];
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Retrieve user from the database based on email
        const result = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result.rows[0];

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            // Passwords do not match
            return res.status(401).json({ error: "Invalid password" });
        }

        // Passwords match
        res.status(200).json({ message: "Login successful", user: user });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default {
    userSignup,
    userLogin
}