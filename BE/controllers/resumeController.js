import db from '../config/db.js';

const addResume = async (req, res) => {
    const { user_id } = req.params;
    const { name, description, education, experience, skill, achievement } = req.body;

    try {
        // Insert the resume into the database
        const result = await db.query(
            `INSERT INTO resume (user_id, name, description, education, experience, skill, achievement) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [user_id, name, description, education, experience, skill, achievement]
        );

        const newResume = result.rows[0];
        res.status(201).json(newResume);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getResume = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try {
        const query = 'SELECT * FROM resume WHERE user_id = $1';
        const { rows } = await db.query(query, [user_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const resume = rows[0];
        res.status(200).json(resume);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateResume = async (req, res) => {
    const { id } = req.params;
    const { description, education, experience, skill, achievement } = req.body;

    try {
        // Update resume's attribute(s)
        const result = await db.query(
            `UPDATE resume SET description=$1, education=$2, experience=$3, skill=$4, achievement=$5 WHERE id=$6 RETURNING *`,
            [description, education, experience, skill, achievement, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const updatedResume = result.rows[0];
        res.status(201).json(updatedResume);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default {
    addResume,
    getResume,
    updateResume
};
