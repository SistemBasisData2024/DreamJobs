-- 1. Buat tipe ENUM
CREATE TYPE roles AS ENUM (
    'Job Seeker', 
    'Company'
);

CREATE TYPE job_type_enum AS ENUM (
    'Full Time', 
    'Part Time', 
    'Contract', 
    'Internship', 
    'Freelance'
);

CREATE TYPE field_enum AS ENUM (
    'Technology', 
    'Finance', 
    'Healthcare', 
    'Education', 
    'Marketing'
);

CREATE TYPE application_status AS ENUM (
    'Interview',
    'Offer', 
    'Reject'
);

-- 2. Buat database
CREATE DATABASE dreamjobs;

CREATE ROLE "admin";

GRANT ALL PRIVILEGES ON DATABASE dreamjobs TO "admin";

alter role admin with superuser createrole createdb replication bypassrls;

-- 3. Menggunakan database yang baru saja dibuat
\c dreamjobs

-- 4. Buat tabel users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role roles NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photo VARCHAR(255)
);

-- 5. Buat tabel resume
CREATE TABLE resume (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name TEXT,
    description TEXT,
    education TEXT,
    experience TEXT,
    skill TEXT,
    achievement TEXT
);

-- 6. Buat tabel company
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name TEXT,
    description TEXT,
    address TEXT,
    contact TEXT
);

-- 7. Buat tabel jobs
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_type job_type_enum NOT NULL,
    field field_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    posting_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Buat tabel applications
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status application_status,
    posting_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);