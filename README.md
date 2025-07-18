# Port-Kart

A modern React-based frontend application, built with Vite and TypeScript, containerized for easy deployment.

---

## Features
- React 19, Vite, TypeScript
- Production-ready Docker and Docker Compose setup
- Environment variable best practices
- Static file serving with `serve`

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (for local dev)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

---

## Docker Usage

### Build and Run with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t port-kart:latest .
   ```
2. **Run the container:**
   ```bash
   docker run -p 3000:3000 port-kart:latest
   ```

### Using Docker Compose

1. **Start the app:**
   ```bash
   docker-compose up --build
   ```
2. **Stop the app:**
   ```bash
   docker-compose down
   ```

---

## Environment Variables

- **Never commit your `.env` files to the repository.**
- `.env` files are excluded from the Docker build via `.dockerignore` for security.
- For local development, place your `.env` file in the project root.
- For production, provide environment variables at runtime using one of the following methods:
  - `env_file` in `docker-compose.yml` (recommended for self-hosted servers)
  - `environment` block in `docker-compose.yml`
  - `docker run --env-file /path/to/prod.env ...`
  - Orchestrator/secret manager (Kubernetes, AWS ECS, etc.)

---

## Production Best Practices

- **Do not bake secrets into your Docker image.**
- Use runtime environment variable injection (see above).
- Use a reverse proxy (e.g., Nginx) for SSL and advanced routing if needed.
- Monitor and update dependencies regularly.

---

## Static File Serving

- The app is built to the `dist/` directory.
- In production, static files are served using the [`serve`](https://www.npmjs.com/package/serve) package.
- If you prefer, you can use Nginx or another static file server instead (see Dockerfile comments for guidance).

---

## Project Structure

```
├── Dockerfile
├── docker-compose.yml
├── package.json
├── src/
├── dist/ (build output)
└── ...
```

---