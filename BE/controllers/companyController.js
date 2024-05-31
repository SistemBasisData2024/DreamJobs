import db from '../config/db.js';

const addDetail = async (req, res) => {
    const { user_id } = req.params;
    const { description, address, contact } = req.body;

    try {
        // Insert the company into the database
        const result = await db.query(
            `INSERT INTO company (user_id, description, address, contact) VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, description, address, contact]
        );

        const newDetail = result.rows[0];
        res.status(201).json(newDetail);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getDetail = async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = 'SELECT * FROM company WHERE user_id = $1';
        const { rows } = await db.query(query, [user_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Detail not found' });
        }

        const resume = rows[0];
        res.status(200).json(resume);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateDetail = async (req, res) => {
    const { id } = req.params;
    const { description, address, contact } = req.body;

    try {
        // Update company's attribute(s)
        const result = await db.query(
            `UPDATE company SET description=$1, address=$2, contact=$3 WHERE id=$4 RETURNING *`,
            [description, address, contact, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const updatedDetail = result.rows[0];
        res.status(201).json(updatedDetail);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default {
    addDetail,
    getDetail,
    updateDetail
};
