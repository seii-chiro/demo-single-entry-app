# Docker Setup Tasks

## Root

- [ ] Create `docker-compose.yml` at the project root.
- [ ] Define a `frontend` service that builds from `frontend/Dockerfile`.
- [ ] Define a `backend` service that builds from `backend/Dockerfile`.
- [ ] Define an `nginx` service that uses `nginx/default.conf` as the reverse proxy config.
- [ ] Add a database service that matches the backend `.env.example` database settings.
- [ ] Configure service dependencies so nginx starts after frontend and backend, and backend starts after the database.
- [ ] Expose the nginx service on a local host port for browser access.
- [ ] Add persistent storage for the database data.
- [ ] Add environment variables needed by the backend container.
- [ ] Verify that `/api/*` routes are forwarded to the backend and all other routes are forwarded to the frontend.

## Frontend

- [ ] Create `frontend/Dockerfile`.
- [ ] Use a Node image to install dependencies and build the Vite React app.
- [ ] Use a lightweight web server image to serve the compiled frontend assets.
- [ ] Copy the built `dist` output into the final runtime image.
- [ ] Expose the frontend container port expected by `nginx/default.conf`.
- [ ] Create `frontend/.dockerignore`.
- [ ] Ignore frontend dependencies, build output, local env files, logs, and editor metadata.

## Backend

- [ ] Create `backend/Dockerfile`.
- [ ] Use a PHP image compatible with the Laravel app PHP requirement.
- [ ] Install required PHP extensions for Laravel and the configured database driver.
- [ ] Install Composer dependencies inside the image.
- [ ] Copy the Laravel application into the container.
- [ ] Set correct writable permissions for `storage` and `bootstrap/cache`.
- [ ] Configure the container to run PHP-FPM.
- [ ] Expose the PHP-FPM port expected by `nginx/default.conf`.
- [ ] Create `backend/.dockerignore`.
- [ ] Ignore Composer vendor files, Node dependencies, build output, local env files, logs, caches, and test artifacts.

## Verification

- [ ] Build all services with Docker Compose.
- [ ] Start the full stack with Docker Compose.
- [ ] Confirm the frontend loads through nginx.
- [ ] Confirm backend API routes respond through nginx.
- [ ] Confirm the backend can connect to the database.
- [ ] Run Laravel migrations inside the backend container.
- [ ] Document the Docker commands needed to build, run, stop, and reset the stack.
