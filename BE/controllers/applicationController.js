import db from '../config/db.js';

const jobStatus = async (req, res) => {
    const status = ['Screening', 'Interview', 'Offer', 'Reject'];
    res.json(status);
}

const addApplication = async (req, res) => {
    const { job_id, user_id, status } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO applications (job_id, user_id, status) VALUES ($1, $2, $3) RETURNING *`,
            [job_id, user_id, status]
        );

        const newApplication = result.rows[0];
        res.status(201).json(newApplication);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const checkApplication = async (req, res) => {
    const { job_id, user_id } = req.params;

    try {
        const query = 'SELECT * FROM applications WHERE job_id = $1 AND user_id = $2';
        const { rows } = await db.query(query, [job_id, user_id]);

        if (rows.length > 0) {
            return res.status(200).json({ applied: true });
        } else {
            return res.status(200).json({ applied: false });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllApplication = async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = `
            SELECT 
                jobs.id AS job_id,
                jobs.title AS job_title, 
                users.name AS company_name, 
                applications.status
            FROM 
                applications
                JOIN jobs ON applications.job_id = jobs.id
                JOIN users ON jobs.user_id = users.id
            WHERE 
                applications.user_id = $1
            ORDER BY 
                applications.posting_date DESC`;

        const { rows } = await db.query(query, [user_id]);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await db.query(
            `UPDATE applications SET status = $1 WHERE id=$2 RETURNING *`,
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }

        const updatedResume = result.rows[0];
        res.status(201).json(updatedResume);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getAllApplicant = async (req, res) => {
    const { job_id } = req.params;

    try {
        const query = 
            `SELECT 
                applications.id,
                resume.user_id AS user_id,
                resume.name AS applicant_name,
                applications.status
            FROM 
                applications
                JOIN resume ON applications.user_id = resume.user_id
                JOIN users ON resume.user_id = users.id
            WHERE 
                applications.job_id = $1`;

        const { rows } = await db.query(query, [job_id]);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default {
    jobStatus,
    addApplication,
    checkApplication,
    getAllApplication,
    updateStatus,
    getAllApplicant
}