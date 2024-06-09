# DreamJobs Website

DreamJobs adalah sebuah platform yang menyediakan berbagai fitur untuk memudahkan pengguna dalam mencari dan melamar pekerjaan. Berikut adalah fitur-fitur yang disediakan:

### Untuk Job Seeker:
- Login dan registrasi akun untuk mengakses fitur platform.
- Kemampuan untuk menambahkan resume untuk meningkatkan profil profesional.
- Akses untuk melihat daftar lengkap lowongan pekerjaan yang tersedia.
- Fitur untuk melihat detail perusahaan yang membuka lowongan.
- Pencarian lowongan pekerjaan berdasarkan kata kunci tertentu.
- Filter pencarian berdasarkan tipe job, bidang pekerjaan, dan lokasi pekerjaan.
- Kemampuan untuk melamar ke lowongan pekerjaan yang sesuai dengan profil.
- Akses untuk melihat daftar lowongan pekerjaan yang telah dilamar.

### Untuk Perusahaan:
- Login dan registrasi akun perusahaan untuk mengelola profil dan lowongan pekerjaan.
- Fitur untuk menambahkan detail perusahaan secara lengkap.
- Kemampuan untuk memposting lowongan pekerjaan secara online.
- Akses untuk melihat daftar job seeker yang mendaftar ke setiap lowongan pekerjaan yang dibuka.
- Kemampuan untuk melihat resume dari setiap job seeker yang melamar.
- Fitur untuk menghapus lowongan pekerjaan yang sudah tidak aktif atau ditutup.

DreamJobs bertujuan untuk mempertemukan job seeker dengan perusahaan secara efisien dan transparan, memberikan pengalaman yang lebih baik dalam mencari dan mengelola peluang karier.

## Panduan Menjalankan Backend dan Frontend
1. **Clone Repository**

   Untuk mendapatkan kode, lakukan clone dari repositori ini:
   ```bash
   https://github.com/SistemBasisData2024/DreamJobs.git
   ```
2. **Backend (BE)**
    Pastikan Anda memiliki Node.js dan npm terinstal di komputer Anda.
    Masuk ke direktori backend dan install dependencies menggunakan npm:
    ```bash
    cd BE
    npm install
    ```
    Untuk menjalankan server backend, gunakan perintah:
    ```bash
    npm run start
    ```
    atau
    ```bash
    node index.js
    ```
3. **Frontend (FE)**
    Masuk ke direktori frontend dan instal dependensi dengan perintah:
    ```bash
    cd FE
    npm install
    ```
    Untuk menjalankan aplikasi frontend, gunakan perintah:
    ```bash
    npm run dev
    ```

## Panduan Pembuatan Tabel di PostgreSQL

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
    name TEXT,
    description TEXT,
    address TEXT,
    contact TEXT
);
```
### Tabel Jobs

```sql
CREATE TYPE job_type_enum AS ENUM ('Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance');
```
```sql
CREATE TYPE field_enum AS ENUM ('Technology', 'Finance', 'Healthcare', 'Education', 'Marketing');
```
```sql
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
```
### Tabel Applications

```sql
CREATE TYPE application_status AS ENUM ('Screening', 'Interview', 'Offer', 'Reject');
```
```sql
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status application_status,
    posting_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## Entity Relationship Diagram (ERD)
![Dreamjobs_ERD](https://github.com/SistemBasisData2024/DreamJobs/blob/17fc57318490475b1e1178fea852f2ba6bf80b1a/Dreamjobs_ERD.jpg)
## Flowchart
![Dreamjobs_Flowchart](https://github.com/SistemBasisData2024/DreamJobs/blob/038efdc5001aa1d10ffcc0518fb031a607b964a3/Dreamjobs_Flowchart.png)
## UML Diagram
![Dreajobs_UML](https://github.com/SistemBasisData2024/DreamJobs/blob/038efdc5001aa1d10ffcc0518fb031a607b964a3/Dreamjobs_UML.png)

## Progress Report
### Pertemuan Pertama  : (31 May 2024)
![Screenshot 2024-05-31 202045](https://github.com/SistemBasisData2024/DreamJobs/assets/120215928/114336ba-fadb-4f96-aa80-28682324f6b8)

### Pertemuan Kedua    : (08 June 2024)
![Screenshot 2024-06-08 211407](https://github.com/SistemBasisData2024/DreamJobs/assets/120215928/472dca89-4768-4bf7-b581-9af9601eea7c)


