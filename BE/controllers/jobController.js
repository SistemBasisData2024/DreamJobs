import db from '../config/db.js';

const jobType = async (req, res) => {
    const jobTypes = ['full_time', 'part_time', 'contract', 'internship', 'freelance'];
    res.json(jobTypes);
}

const field = async (req, res) => {
    const fields = ['technology', 'finance', 'healthcare', 'education', 'marketing', 'sales'];
    res.json(fields);
}

// Posting pekerjaan
const addJob = async (req, res) => {
    const { company_id } = req.params;
    const { job_type, field, title, description, location } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO jobs (company_id, job_type, field, title, description, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [company_id, job_type, field, title, description, location]
        );

        const newJob = result.rows[0];
        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Menampilkan detail job berdasarkan id di tabel jobs
const getJob = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'SELECT * FROM jobs WHERE id = $1';
        const { rows } = await db.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const job = rows[0];
        res.status(200).json(job);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Menampilkan beberap atribut dari tabel jobs berdasarkan job_type
const getJobsByType = async (req, res) => {
    const { job_type } = req.params;

    try {
        const query = 
            `SELECT jobs.title, users.name AS company_name, jobs.field, jobs.job_type
             FROM jobs JOIN users ON jobs.company_id = users.id
             WHERE jobs.job_type = $1`;

        const { rows } = await db.query(query, [job_type]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Jobs not found for this field' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Menampilkan beberap atribut dari tabel jobs berdasarkan field
const getJobsByField = async (req, res) => {
    const { field } = req.params;

    try {
        const query = 
            `SELECT jobs.title, users.name AS company_name, jobs.field, jobs.job_type
             FROM jobs JOIN users ON jobs.company_id = users.id
             WHERE jobs.field = $1`;

        const { rows } = await db.query(query, [field]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Jobs not found for this field' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Menampilkan beberap atribut dari tabel jobs berdasarkan location
const getJobsByLocation = async (req, res) => {
    const { location } = req.params;

    try {
        const query = 
            `SELECT jobs.title, users.name AS company_name, jobs.field, jobs.job_type
             FROM jobs JOIN users ON jobs.company_id = users.id
             WHERE jobs.location = $1`;

        const { rows } = await db.query(query, [location]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Jobs not found for this location' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default {
    jobType,
    field,
    addJob,
    getJob,
    getJobsByType,
    getJobsByLocation,
    getJobsByField
}
