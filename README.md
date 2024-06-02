# Panduan Pembuatan Tabel di PostgreSQL

Berikut adalah langkah-langkah untuk membuat tabel-tabel dalam basis data PostgreSQL menggunakan perintah SQL.

### Tabel Users

```sql
CREATE TYPE roles AS ENUM ('Job Seeker', 'Company');
```
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role roles NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photo VARCHAR(255)
);
```
### Tabel Resume

```sql
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
```
### Tabel Company

```sql
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    description TEXT,
    address TEXT,
    contact TEXT
);
```
### Tabel Jobs

```sql
CREATE TYPE job_type_enum AS ENUM ('full_time', 'part_time', 'contract', 'internship', 'freelance');
```
```sql
CREATE TYPE field_enum AS ENUM ('technology', 'finance', 'healthcare', 'education', 'marketing', 'sales');
```
```sql
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_type job_type_enum NOT NULL,
    field field_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    posting_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### Tabel Applications

```sql
CREATE TYPE application_status AS ENUM ('Screening', 'Interview', 'Offer', 'Reject');
```
```sql
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status application_status,
    posting_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
<<<<<<< HEAD
=======

# Flowchart

![Dreamjobs_Flowchart](https://github.com/SistemBasisData2024/DreamJobs/assets/120215928/eef63ff7-ef0e-4938-b70c-800442675f1c)
>>>>>>> 0d4a826a537dab92112a992ac0b9f632a8aaf5c9
