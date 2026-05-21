# Project Alpha NestJS Prototype

This folder contains a simple, runnable prototype for the "Backend API and Models Agent" sprint task from Project Alpha.

## 1. Database Schema

The relational schema is in [schema.sql](./schema.sql) and covers:

- `mothers`
- `groups`
- `group_meetings`
- `applications`
- `group_memberships`

## 2. NestJS Entities

TypeORM entities live in `src/entities` and map directly to the five required tables.

## 3. Controllers And Services

Each table has:

- a basic CRUD controller in `src/controllers`
- a matching CRUD service in `src/services`

The prototype uses `sql.js` with TypeORM so it can run locally without setting up PostgreSQL or MySQL first.

## 4. Explanation

- `groups.leader_mother_id` points to `mothers.id` because group leaders are also mothers in this scenario.
- `group_meetings.group_id` creates a one-to-many relationship from groups to meeting slots.
- `applications` links an applicant mother to a target group and optionally to a reviewing mother.
- `group_memberships` is a join table between mothers and groups because accepted applicants become members of a group.
- `group_memberships` has a unique constraint on `(mother_id, group_id)` so the same mother is not added twice to the same group.

## 5. Limitations

- The prototype does not enforce business workflows, such as "only accepted applications can become memberships."
- Authorization, pagination, search, audit history, and production-grade validation are intentionally omitted.
- The SQL file is Postgres-style DDL, while the runnable demo uses TypeORM with `sql.js` for convenience.
- Scheduling conflicts, group capacity checks, and location-distance logic still need manual business rules.

## Run It

```bash
npm install
npm run build
npm test
npm run start:dev
```

The app starts on `http://localhost:3001` by default.

## Docker

```bash
docker build -t project-alpha-nest-prototype .
docker run --rm -p 3001:3001 -v project-alpha-data:/data project-alpha-nest-prototype
```

Or use compose (named volume on `/data`):

```bash
docker compose up --build
```

The container listens on port `3001` (`PORT` defaults to `3001`; override with `-e PORT=...`).

### Persistent SQLite (`sql.js`)

The database file must live on a **volume**, not inside the container filesystem, so redeploys keep data.

| Environment variable | Default (Docker image) | Purpose |
| --- | --- | --- |
| `PROJECT_ALPHA_DB_LOCATION` | `/data/project-alpha.sqlite` | Full path to the SQLite file |
| `PROJECT_ALPHA_DATA_DIR` | — | Alternative: directory + `PROJECT_ALPHA_DB_FILENAME` |
| `PROJECT_ALPHA_DB_FILENAME` | `project-alpha.sqlite` | Used with `PROJECT_ALPHA_DATA_DIR` |
| `PROJECT_ALPHA_DB_AUTOSAVE` | `true` | Persist sql.js changes to disk |

Local `npm run start:dev` still uses `./project-alpha.sqlite` in the project directory when those variables are unset.

#### Coolify

1. Open the backend service → **Persistent Storage** (or **Volumes**).
2. Add a volume with **mount path** `/data` (must match the image default).
3. Leave `PROJECT_ALPHA_DB_LOCATION=/data/project-alpha.sqlite` (set in the Dockerfile) or set it explicitly in **Environment Variables**.
4. Redeploy. The SQLite file is created on first start under `/data/project-alpha.sqlite` on the host-backed volume.

`docker-entrypoint.sh` creates the mount directory if needed before Nest boots.

## Browser Testing

- Dashboard UI: `http://localhost:3001/`
- Swagger UI: `http://localhost:3001/docs`
- OpenAPI JSON: `http://localhost:3001/docs-json`
