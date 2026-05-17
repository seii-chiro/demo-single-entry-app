# single-entry Setup Guide

`single-entry` runs two apps behind one Nginx entry point:

- `frontend` - React/Vite app
- `backend` - Laravel API

The public URL is:

```text
http://localhost:9020
```

Requests under `/api` are forwarded to the Laravel backend. All other requests are forwarded to the React frontend.

## Prerequisites

- Docker Desktop
- Docker Compose
- Node.js and npm, if running the frontend locally
- PHP `8.3+` and Composer, if running the backend locally

## Docker Setup

1. Copy the backend environment file:

   ```powershell
   cd backend
   Copy-Item .env.example .env
   ```

   On macOS, Linux, Git Bash, or WSL:

   ```bash
   cp .env.example .env
   ```

2. Update `backend/.env` for Docker:

   ```env
   APP_URL=http://localhost:9020
   DB_CONNECTION=pgsql
   DB_HOST=db
   DB_PORT=5432
   DB_DATABASE=sample_db
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   ```

3. Copy the frontend environment file:

   ```powershell
   cd ../frontend
   Copy-Item .env.example .env
   ```

   On macOS, Linux, Git Bash, or WSL:

   ```bash
   cp .env.example .env
   ```

4. Update `frontend/.env`:

   ```env
   VITE_BASE_URL=http://localhost:9020
   ```

5. Start the stack from the `single-entry` folder:

   ```bash
   cd ..
   docker compose up -d --build
   ```

6. Initialize Laravel:

   ```bash
   docker compose exec backend php artisan key:generate
   docker compose exec backend php artisan migrate --seed
   ```

Open:

```text
http://localhost:9020
```

The PostgreSQL database is exposed to your machine as `localhost:5450`.

## Local Setup

Start the Laravel backend:

```powershell
cd backend
composer install
Copy-Item .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

On macOS, Linux, Git Bash, or WSL, replace the copy command with:

```bash
cp .env.example .env
```

Start the React frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

When running locally, set `frontend/.env` to the local Laravel URL:

```env
VITE_BASE_URL=http://localhost:8000
```

## Useful Commands

```bash
docker compose exec backend php artisan test
docker compose exec backend php artisan migrate:fresh --seed
docker compose down
```

To remove the database volume too:

```bash
docker compose down -v
```
