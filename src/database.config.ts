import path from 'path';
import { SqljsConnectionOptions } from 'typeorm/driver/sqljs/SqljsConnectionOptions';
import { entities } from './entities';

/** Persistent volume mount used in Docker / Coolify (see Dockerfile and README). */
export const DEFAULT_DOCKER_DATA_DIR = '/data';
export const DEFAULT_DB_FILENAME = 'project-alpha.sqlite';

/**
 * Resolve the sql.js SQLite file path.
 * Priority: PROJECT_ALPHA_DB_LOCATION > PROJECT_ALPHA_DATA_DIR + filename > cwd default.
 */
export function resolveDatabaseLocation(): string {
  if (process.env.PROJECT_ALPHA_DB_LOCATION) {
    return process.env.PROJECT_ALPHA_DB_LOCATION;
  }

  if (process.env.PROJECT_ALPHA_DATA_DIR) {
    const fileName = process.env.PROJECT_ALPHA_DB_FILENAME ?? DEFAULT_DB_FILENAME;
    return path.join(process.env.PROJECT_ALPHA_DATA_DIR, fileName);
  }

  return path.join(process.cwd(), DEFAULT_DB_FILENAME);
}

export function buildDatabaseOptions(): SqljsConnectionOptions {
  const location = resolveDatabaseLocation();
  const autoSave = process.env.PROJECT_ALPHA_DB_AUTOSAVE !== 'false';

  return {
    type: 'sqljs',
    location,
    autoSave,
    synchronize: true,
    entities,
  };
}
