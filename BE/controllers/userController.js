import db from '../config/db.js';
import bcrypt from 'bcrypt';

const userRoles = async (req, res) => {
    const roles = ['Job Seeker', 'Company'];
    res.json(roles);
}

const userSignup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const photo = req.file;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Construct the photo path
        const photoPath = photo ? `/uploads/${photo.filename}` : null;

        // Insert the user into the database
        const result = await db.query(
            `INSERT INTO users (name, email, password, role, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, hashedPassword, role, photoPath]
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

const getUserById = async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = `SELECT email, name, role, photo FROM users WHERE id = $1`;

        const { rows } = await db.query(query, [user_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
<<<<<<< HEAD

=======
 
>>>>>>> 0d4a826a537dab92112a992ac0b9f632a8aaf5c9
        const user = rows[0];
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export default {
    userRoles,
    userSignup,
    userLogin,
    getUserById
}