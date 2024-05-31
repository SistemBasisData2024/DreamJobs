# Panduan Pembuatan Tabel di PostgreSQL

Berikut adalah langkah-langkah untuk membuat tabel-tabel dalam basis data PostgreSQL menggunakan perintah SQL.

### Tabel Users

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### Tabel Resume

```sql
CREATE TABLE resume (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
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
